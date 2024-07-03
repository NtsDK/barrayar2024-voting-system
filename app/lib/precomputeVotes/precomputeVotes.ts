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
import { computeAffiliatedCountVotes } from "./computeAffiliatedCountVotes";
import { computeUnaffiliatedCountVotes } from "./computeUnaffiliatedCountVotes";

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
  const {
    restUnaffiliatedCounts,
    unaffiliatedCountsSocCapitalExpenses,
    unaffiliatedCountsVoteIndex,
    unaffiliatedCountsVoteLog,
  } = computeUnaffiliatedCountVotes(countsVoteLog, countessQuestionRequests, socCapitalValues, totalUnaffiliatedCounts);

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
    unaffiliatedCountsVoteIndex,
    unaffiliatedCountsVoteLog,
    unaffiliatedCountsSocCapitalExpenses,
    restUnaffiliatedCounts,
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
