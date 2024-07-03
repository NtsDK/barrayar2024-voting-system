import { assert } from "../utils";
import {
  AffiliatedCount,
  CountVoteStatus,
  CountessActions,
  CountessQuestionRequest,
  CountessQuestionRequestTable,
  // CountessesVoteLog,
  CountsVoteLog,
  MeaningfulVote,
  Vote,
  // VoteComputeResult,
} from "../voteDefinitions";
import { computeAffiliatedCountVotes } from "./computeAffiliatedCountVotes";
import { computeUnaffiliatedCountVotes } from "./computeUnaffiliatedCountVotes";
import { summarizeVotes } from "./summarizeVotes";

export function canPrecomputeVotes(countsVoteLog: CountsVoteLog) {
  return Object.values(countsVoteLog).every((vote) => vote.vote !== "notFilled");
}

export function precomputeVotes(
  countsVoteLog: CountsVoteLog,
  socCapitalValues: Record<CountessActions, number>,
  countessQuestionRequests: CountessQuestionRequestTable[],
  masterVote: MeaningfulVote,
) {
  assert(canPrecomputeVotes(countsVoteLog), "Есть незаполненные графы");

  const { countsVoteIndex } = computeCountVotes(countsVoteLog);

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

  const { summary, voteStatus } = summarizeVotes(
    countsVoteIndex,
    affiliatedCountsVoteIndex,
    unaffiliatedCountsVoteIndex,
    masterVote,
  );

  return {
    // суммаризация
    summary,
    voteStatus,
    // голосование графов
    // countsVoteIndex,
    // countsVoteStatus,
    // голосование графинь
    countessQuestionRequestsCount: countessQuestionRequests.length,
    // голосование аффилированных графов
    // affiliatedCountsVoteIndex,
    affiliatedCountsVoteLog,
    affiliatedCountsSocCapitalExpenses,
    // голосование неаффилированных графов
    unaffiliatedCountsByCountesses,
    unaffiliatedCountsByRequestsAbsense,
    totalUnaffiliatedCounts,
    // unaffiliatedCountsVoteIndex,
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

  return {
    countsVoteIndex,
  };
}
