import { assert } from "../utils";
import {
  UnaffiliatedCount,
  CountessActions,
  CountessQuestionRequest,
  CountessQuestionRequestTable,
  // CountessesVoteLog,
  CountsVoteLog,
  Vote,
  MeaningfulVote,
  UnaffiliatedCountVoteLogItem,
  // VoteComputeResult,
} from "../voteDefinitions";

function makeUnaffiliatedCountLogger(
  countessQuestionRequest: CountessQuestionRequestTable,
  socCapitalValues: Record<CountessActions, number>,
  countVote: Vote,
) {
  return (type: "vote" | "absence" | "noFreeCounts", voteType: UnaffiliatedCount): UnaffiliatedCountVoteLogItem => ({
    type,
    timestamp: countessQuestionRequest.timestamp,
    house_name: countessQuestionRequest.house_name,
    voteType,
    socialCapitalChange: type === "vote" ? socCapitalValues[`unaffiliated_${voteType}`] : 0,
    countVote,
  });
}

function makeAddExpense(
  socCapitalExpenses: Record<string, { house_name: string; expenses: number }>,
  countessQuestionRequest: CountessQuestionRequestTable,
  socCapitalValues: Record<CountessActions, number>,
) {
  return (voteType: UnaffiliatedCount) => {
    const { house_id, house_name } = countessQuestionRequest;
    if (!socCapitalExpenses[house_id]) {
      socCapitalExpenses[house_id] = {
        house_name,
        expenses: 0,
      };
    }
    socCapitalExpenses[house_id].expenses += socCapitalValues[`unaffiliated_${voteType}`];
  };
}

/** Считает голоса графов, аффилированных с графинями */
export function computeUnaffiliatedCountVotes(
  countsVoteLog: CountsVoteLog,
  countessQuestionRequests: CountessQuestionRequestTable[],
  socCapitalValues: Record<CountessActions, number>,
  totalUnaffiliatedCounts: number,
) {
  const unaffiliatedCountsVoteIndex: Record<MeaningfulVote, number> = {
    answer1: 0,
    answer2: 0,
    abstain: 0,
  };

  let restUnaffiliatedCounts = totalUnaffiliatedCounts;

  const unaffiliatedCountsVoteLog: UnaffiliatedCountVoteLogItem[] = [];

  const unaffiliatedCountsSocCapitalExpenses: Record<string, { house_name: string; expenses: number }> = {};

  countessQuestionRequests.forEach((countessQuestionRequest) => {
    const { unaffiliatedCounts, house_id } = countessQuestionRequest;
    const countVote = countsVoteLog[house_id].vote;
    const logger = makeUnaffiliatedCountLogger(countessQuestionRequest, socCapitalValues, countVote);
    const addExpense = makeAddExpense(unaffiliatedCountsSocCapitalExpenses, countessQuestionRequest, socCapitalValues);
    unaffiliatedCounts.forEach((voteType) => {
      switch (voteType) {
        // ничего не делаем
        case "unaffiliated":
          // unaffiliatedCountsByCountesses++;
          break;
        case "answer1": {
          if (restUnaffiliatedCounts > 0) {
            unaffiliatedCountsVoteIndex.answer1++;
            unaffiliatedCountsVoteLog.push(logger("vote", voteType));
            addExpense(voteType);
            restUnaffiliatedCounts--;
          } else {
            unaffiliatedCountsVoteLog.push(logger("noFreeCounts", voteType));
          }
          break;
        }
        case "answer2": {
          if (restUnaffiliatedCounts > 0) {
            unaffiliatedCountsVoteIndex.answer2++;
            unaffiliatedCountsVoteLog.push(logger("vote", voteType));
            addExpense(voteType);
            restUnaffiliatedCounts--;
          } else {
            unaffiliatedCountsVoteLog.push(logger("noFreeCounts", voteType));
          }
          break;
        }
        case "forCount": {
          if (countVote === "absent") {
            unaffiliatedCountsVoteLog.push(logger("absence", voteType));
          } else if (restUnaffiliatedCounts === 0) {
            unaffiliatedCountsVoteLog.push(logger("noFreeCounts", voteType));
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            unaffiliatedCountsVoteIndex[countVote]++;
            addExpense(voteType);
            unaffiliatedCountsVoteLog.push(logger("vote", voteType));
            restUnaffiliatedCounts--;
          }
          break;
        }
        case "againstCount": {
          if (countVote === "absent") {
            unaffiliatedCountsVoteLog.push(logger("absence", voteType));
          } else if (restUnaffiliatedCounts === 0) {
            unaffiliatedCountsVoteLog.push(logger("noFreeCounts", voteType));
          } else if (countVote === "answer1" || countVote === "answer2" || countVote === "abstain") {
            const counterVote = countVote === "answer1" ? "answer2" : countVote === "answer2" ? "answer1" : "abstain";
            unaffiliatedCountsVoteIndex[counterVote]++;
            addExpense(voteType);
            unaffiliatedCountsVoteLog.push(logger("vote", voteType));
            restUnaffiliatedCounts--;
          }

          break;
        }
      }
    });
  });

  return {
    unaffiliatedCountsVoteIndex,
    unaffiliatedCountsVoteLog,
    unaffiliatedCountsSocCapitalExpenses,
    restUnaffiliatedCounts,
  };
}
