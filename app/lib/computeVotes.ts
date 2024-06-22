import { assert } from "./utils";
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
} from "./voteDefinitions";

export function canPrecomputeVotes(countsVoteLog: CountsVoteLog) {
  return Object.values(countsVoteLog).every(
    (vote) => vote.vote !== "notFilled"
  );
}

export default function precomputeVotes(
  countsVoteLog: CountsVoteLog,
  socCapitalValues: Record<CountessActions, number>,
  countessQuestionRequests: CountessQuestionRequestTable[]
  // countessesVoteLog: CountessQuestionRequest[],
) {
  assert(canPrecomputeVotes(countsVoteLog), "Есть незаполненные графы");

  const { countsVoteIndex, countsVoteStatus } =
    computeCountVotes(countsVoteLog);

  // считаем голоса аффилированных графов
  const { affiliatedCountessIndex, unaffiliatedCountsByCountesses } =
    computeAffiliatedCountVotes(countsVoteLog, countessQuestionRequests);

  // считаем голоса неаффилированных графов

  return {
    countsVoteIndex,
    countsVoteStatus,
    affiliatedCountessIndex,
    unaffiliatedCountsByCountesses,
  };
}

export function computeAffiliatedCountVotes(
  countsVoteLog: CountsVoteLog,
  countessQuestionRequests: CountessQuestionRequestTable[]
  // countessesVoteLog: CountessQuestionRequest[]
) {
  const affiliatedCountessIndex: Record<
    Exclude<Vote, "notFilled" | "absent">,
    number
  > = {
    answer1: 0,
    answer2: 0,
    abstain: 0,
  };

  let unaffiliatedCountsByCountesses = 0;

  countessQuestionRequests.forEach(({ affiliatedCounts, house_id }) => {
    const countVote = countsVoteLog[house_id].vote;
    affiliatedCounts.forEach((voteType) => {
      switch (voteType) {
        // ничего не делаем
        case "unaffiliated":
          unaffiliatedCountsByCountesses++;
          break;
        case "answer1": {
          affiliatedCountessIndex.answer1++;
          break;
        }
        case "answer2": {
          affiliatedCountessIndex.answer2++;
          break;
        }
        case "abstain": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else {
            affiliatedCountessIndex.abstain++;
          }
          break;
        }
        case "forCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else if (countVote === "answer1" || countVote === "answer2") {
            affiliatedCountessIndex[countVote]++;
          }
          break;
        }
        case "againstCount": {
          if (countVote === "absent") {
            unaffiliatedCountsByCountesses++;
          } else if (countVote === "answer1" || countVote === "answer2") {
            affiliatedCountessIndex[
              countVote === "answer1" ? "answer2" : "answer1"
            ]++;
          }
          break;
        }
      }
    });
  });

  return {
    affiliatedCountessIndex,
    unaffiliatedCountsByCountesses,
  };
}

export function computeCountVotes(countsVoteLog: CountsVoteLog) {
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
    }
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
