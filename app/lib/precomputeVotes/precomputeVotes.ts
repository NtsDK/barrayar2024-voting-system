import { assert } from "../utils";
import {
  AffiliatedCount,
  CountVoteStatus,
  CountessActions,
  CountessQuestionRequest,
  CountessQuestionRequestTable,
  // CountessesVoteLog,
  CountsVoteLog,
  Vote,
  // VoteComputeResult,
} from "../voteDefinitions";

export function canPrecomputeVotes(countsVoteLog: CountsVoteLog) {
  return Object.values(countsVoteLog).every((vote) => vote.vote !== "notFilled");
}

export function precomputeVotes(
  countsVoteLog: CountsVoteLog,
  socCapitalValues: Record<CountessActions, number>,
  countessQuestionRequests: CountessQuestionRequestTable[],
  // countessesVoteLog: CountessQuestionRequest[],
) {
  assert(canPrecomputeVotes(countsVoteLog), "Есть незаполненные графы");

  const { countsVoteIndex, countsVoteStatus } = computeCountVotes(countsVoteLog);

  // считаем голоса аффилированных графов
  const {
    affiliatedCountsVoteIndex,
    unaffiliatedCountsByCountesses,
    affiliatedCountsVoteLog,
    affiliatedCountsSocCapitalExpenses,
  } = computeAffiliatedCountVotes(countsVoteLog, countessQuestionRequests, socCapitalValues);

  const unaffiliatedCountsByRequestsAbsense = (15 - countessQuestionRequests.length) * 3;

  const totalUnaffiliatedCounts = unaffiliatedCountsByCountesses + unaffiliatedCountsByRequestsAbsense;

  // считаем голоса неаффилированных графов

  return {
    // голосование графов
    countsVoteIndex,
    countsVoteStatus,
    // голосование графинь
    countessQuestionRequestsCount: countessQuestionRequests.length,
    // голосование аффилированных графов
    affiliatedCountsVoteIndex,
    affiliatedCountsVoteLog,
    affiliatedCountsSocCapitalExpenses,
    // голосование неаффилированных графов
    unaffiliatedCountsByCountesses,
    unaffiliatedCountsByRequestsAbsense,
    totalUnaffiliatedCounts,
  };
}

type AffiliatedCountVoteLogItem = {
  type: "vote" | "absence";
  voteType: AffiliatedCount;
  timestamp: Date;
  house_name: string;
  socialCapitalChange: number;
  countVote: Vote;
};

function makeAffiliatedCountLogger(
  countessQuestionRequest: CountessQuestionRequestTable,
  socCapitalValues: Record<CountessActions, number>,
  countVote: Vote,
) {
  return (type: "vote" | "absence", voteType: AffiliatedCount): AffiliatedCountVoteLogItem => ({
    type,
    timestamp: countessQuestionRequest.timestamp,
    house_name: countessQuestionRequest.house_name,
    voteType,
    socialCapitalChange: type === "vote" ? socCapitalValues[`affiliated_${voteType}`] : 0,
    countVote,
  });
}

function makeAddExpense(
  affiliatedCountsSocCapitalExpenses: Record<string, { house_name: string; expenses: number }>,
  countessQuestionRequest: CountessQuestionRequestTable,
  socCapitalValues: Record<CountessActions, number>,
) {
  return (voteType: AffiliatedCount) => {
    const { house_id, house_name } = countessQuestionRequest;
    if (!affiliatedCountsSocCapitalExpenses[house_id]) {
      affiliatedCountsSocCapitalExpenses[house_id] = {
        house_name,
        expenses: 0,
      };
    }
    affiliatedCountsSocCapitalExpenses[house_id].expenses += socCapitalValues[`affiliated_${voteType}`];
  };
}

/** Считает голоса графов, аффилированных с графинями */
export function computeAffiliatedCountVotes(
  countsVoteLog: CountsVoteLog,
  countessQuestionRequests: CountessQuestionRequestTable[],
  socCapitalValues: Record<CountessActions, number>,
  // countessesVoteLog: CountessQuestionRequest[]
) {
  const affiliatedCountsVoteIndex: Record<Exclude<Vote, "notFilled" | "absent">, number> = {
    answer1: 0,
    answer2: 0,
    abstain: 0,
  };

  let unaffiliatedCountsByCountesses = 0;

  const affiliatedCountsVoteLog: AffiliatedCountVoteLogItem[] = [];

  const affiliatedCountsSocCapitalExpenses: Record<string, { house_name: string; expenses: number }> = {};

  countessQuestionRequests.forEach((countessQuestionRequest) => {
    const { affiliatedCounts, house_id } = countessQuestionRequest;
    const countVote = countsVoteLog[house_id].vote;
    const affiliatedCountLogger = makeAffiliatedCountLogger(countessQuestionRequest, socCapitalValues, countVote);
    const addExpense = makeAddExpense(affiliatedCountsSocCapitalExpenses, countessQuestionRequest, socCapitalValues);
    affiliatedCounts.forEach((voteType) => {
      switch (voteType) {
        // ничего не делаем
        case "unaffiliated":
          unaffiliatedCountsByCountesses++;
          break;
        case "answer1": {
          affiliatedCountsVoteIndex.answer1++;
          affiliatedCountsVoteLog.push(affiliatedCountLogger("vote", voteType));
          addExpense(voteType);
          break;
        }
        case "answer2": {
          affiliatedCountsVoteIndex.answer2++;
          affiliatedCountsVoteLog.push(affiliatedCountLogger("vote", voteType));
          addExpense(voteType);
          break;
        }
        case "abstain": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else {
            affiliatedCountsVoteIndex.abstain++;
            addExpense(voteType);
          }
          affiliatedCountsVoteLog.push(affiliatedCountLogger(countVote === "absent" ? "absence" : "vote", voteType));
          break;
        }
        case "forCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            affiliatedCountsVoteIndex[countVote]++;
            addExpense(voteType);
          }
          affiliatedCountsVoteLog.push(affiliatedCountLogger(countVote === "absent" ? "absence" : "vote", voteType));
          break;
        }
        case "againstCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            affiliatedCountsVoteIndex[countVote === "answer1" ? "answer2" : "answer1"]++;
            addExpense(voteType);
          }
          affiliatedCountsVoteLog.push(affiliatedCountLogger(countVote === "absent" ? "absence" : "vote", voteType));
          break;
        }
      }
    });
  });

  return {
    affiliatedCountsVoteIndex,
    unaffiliatedCountsByCountesses,
    affiliatedCountsVoteLog,
    affiliatedCountsSocCapitalExpenses,
  };
}

/** Считает голоса графов */
function computeCountVotes(countsVoteLog: CountsVoteLog) {
  const countsVoteIndex = Object.values(countsVoteLog).reduce(
    (acc: Record<Vote, number>, vote) => {
      acc[vote.vote]++;
      return acc;
    },
    {
      answer1: 0,
      answer2: 0,
      notFilled: 0,
      abstain: 0,
      absent: 0,
    },
  );

  const countsVoteStatus: CountVoteStatus =
    countsVoteIndex.answer1 === countsVoteIndex.answer2
      ? "draw"
      : countsVoteIndex.answer1 > countsVoteIndex.answer2
      ? "answer1"
      : "answer2";

  return {
    countsVoteIndex,
    countsVoteStatus,
  };
}
