import { assert } from "../utils";
import {
  AffiliatedCount,
  AffiliatedCountVoteLogItem,
  CountessActions,
  CountessQuestionRequest,
  CountessQuestionRequestTable,
  // CountessesVoteLog,
  CountsVoteLog,
  MeaningfulVote,
  Vote,
  // VoteComputeResult,
} from "../voteDefinitions";

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
): {
  affiliatedCountsVoteIndex: Record<MeaningfulVote, number>;
  unaffiliatedCountsByCountesses: number;
  affiliatedCountsVoteLog: AffiliatedCountVoteLogItem[];
  affiliatedCountsSocCapitalExpenses: Record<string, { house_name: string; expenses: number }>;
} {
  const affiliatedCountsVoteIndex: Record<MeaningfulVote, number> = {
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
    const logger = makeAffiliatedCountLogger(countessQuestionRequest, socCapitalValues, countVote);
    const addExpense = makeAddExpense(affiliatedCountsSocCapitalExpenses, countessQuestionRequest, socCapitalValues);
    affiliatedCounts.forEach((voteType) => {
      switch (voteType) {
        // ничего не делаем
        case "unaffiliated":
          unaffiliatedCountsByCountesses++;
          break;
        case "answer1": {
          affiliatedCountsVoteIndex.answer1++;
          affiliatedCountsVoteLog.push(logger("vote", voteType));
          addExpense(voteType);
          break;
        }
        case "answer2": {
          affiliatedCountsVoteIndex.answer2++;
          affiliatedCountsVoteLog.push(logger("vote", voteType));
          addExpense(voteType);
          break;
        }
        case "abstain": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
            affiliatedCountsVoteLog.push(logger("absence", voteType));
          } else {
            affiliatedCountsVoteIndex.abstain++;
            addExpense(voteType);
            affiliatedCountsVoteLog.push(logger("vote", voteType));
          }
          break;
        }
        case "forCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
            affiliatedCountsVoteLog.push(logger("absence", voteType));
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            affiliatedCountsVoteIndex[countVote]++;
            addExpense(voteType);
            affiliatedCountsVoteLog.push(logger("vote", voteType));
          }
          break;
        }
        case "againstCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
            affiliatedCountsVoteLog.push(logger("absence", voteType));
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            const counterVote = countVote === "answer1" ? "answer2" : countVote === "answer2" ? "answer1" : "abstain";
            affiliatedCountsVoteIndex[counterVote]++;
            addExpense(voteType);
            affiliatedCountsVoteLog.push(logger("vote", voteType));
          }
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
