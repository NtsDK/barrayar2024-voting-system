import { assert } from "../utils";
import {
  AffiliatedCount,
  AffiliatedCountVoteLogItem,
  CountVoteStatus,
  CountessActions,
  CountessQuestionRequest,
  CountessQuestionRequestTable,
  // CountessesVoteLog,
  CountsVoteLog,
  MeaningfulVote,
  PrecomputeVotesResult,
  SocCapitalExpenseRecord,
  SocCapitalExpenses,
  UnaffiliatedCount,
  UnaffiliatedCountVoteLogItem,
  Vote,
  VoteSummaryRow,
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
): PrecomputeVotesResult {
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

  const { summary, questionStatus } = summarizeVotes(
    countsVoteIndex,
    affiliatedCountsVoteIndex,
    unaffiliatedCountsVoteIndex,
    masterVote,
  );

  const socCapitalExpenses = calcSocCapitalExpenses(
    affiliatedCountsSocCapitalExpenses,
    unaffiliatedCountsSocCapitalExpenses,
  );

  return {
    // суммаризация итогов голосования
    summary,
    questionStatus,
    // подсчет расходов по соцкапиталу
    socCapitalExpenses,
    // голосование графинь
    countessQuestionRequestsCount: countessQuestionRequests.length,
    // голосование аффилированных графов
    affiliatedCountsVoteLog,
    // голосование неаффилированных графов
    unaffiliatedCountsByCountesses,
    unaffiliatedCountsByRequestsAbsense,
    totalUnaffiliatedCounts,
    unaffiliatedCountsVoteLog,
    restUnaffiliatedCounts,
  };
}

function calcSocCapitalExpenses(
  affiliatedCountsSocCapitalExpenses: SocCapitalExpenses,
  unaffiliatedCountsSocCapitalExpenses: SocCapitalExpenses,
): SocCapitalExpenseRecord[] {
  const expenses: SocCapitalExpenseRecord[] = [];

  const houseIds = new Set<string>([
    ...Object.keys(affiliatedCountsSocCapitalExpenses),
    ...Object.keys(unaffiliatedCountsSocCapitalExpenses),
  ]);

  for (const houseId of Array.from(houseIds)) {
    const aff = affiliatedCountsSocCapitalExpenses[houseId];
    const unaff = unaffiliatedCountsSocCapitalExpenses[houseId];
    expenses.push({
      house_id: houseId,
      house_name: aff?.house_name || unaff?.house_name,
      affiliatedCountsExpenses: aff?.expenses || 0,
      unaffiliatedCountsExpenses: unaff?.expenses || 0,
      totalCountsExpenses: (aff?.expenses || 0) + (unaff?.expenses || 0),
    });
  }

  expenses.sort((a, b) => a.house_name.localeCompare(b.house_name));

  return expenses;
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
