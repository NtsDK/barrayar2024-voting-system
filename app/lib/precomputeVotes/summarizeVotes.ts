import { CountVoteStatus, MeaningfulVote, VoteSummaryRow } from "../voteDefinitions";

export function summarizeVotes(
  countsVoteIndex: Record<MeaningfulVote, number>,
  affiliatedCountsVoteIndex: Record<MeaningfulVote, number>,
  unaffiliatedCountsVoteIndex: Record<MeaningfulVote, number>,
  masterVote: MeaningfulVote,
): { summary: VoteSummaryRow[]; voteStatus: CountVoteStatus } {
  const summary: VoteSummaryRow[] = [];
  summary.push({
    name: "Голоса графов",
    voteIndex: countsVoteIndex,
  });
  summary.push({
    name: "Голоса своих графов",
    voteIndex: affiliatedCountsVoteIndex,
  });
  summary.push({
    name: "Голоса свободных графов",
    voteIndex: unaffiliatedCountsVoteIndex,
  });

  const totalVoteIndex = sumVoteIndexes(countsVoteIndex, affiliatedCountsVoteIndex, unaffiliatedCountsVoteIndex);
  const totalVoteStatus = getCountVoteStatus(totalVoteIndex);

  summary.push({
    name: "Сумма голосов",
    voteIndex: totalVoteIndex,
    voteStatus: totalVoteStatus,
  });

  if (totalVoteStatus !== "draw") {
    return {
      summary,
      voteStatus: totalVoteStatus,
    };
  }

  const countsVoteStatus = getCountVoteStatus(countsVoteIndex);
  summary.push({
    name: "Голоса графов",
    voteIndex: countsVoteIndex,
    voteStatus: countsVoteStatus,
  });

  if (countsVoteStatus !== "draw") {
    return {
      summary,
      voteStatus: countsVoteStatus,
    };
  }

  const totalVoteIndex2 = { ...totalVoteIndex };
  totalVoteIndex2[masterVote]++;
  const totalVoteStatus2 = getCountVoteStatus(totalVoteIndex2);

  summary.push({
    name: "Голоса с поправкой мастера",
    voteIndex: totalVoteIndex2,
    voteStatus: totalVoteStatus2,
  });

  return {
    summary,
    voteStatus: totalVoteStatus2,
  };
}

function sumVoteIndexes(...arr: Record<MeaningfulVote, number>[]): Record<MeaningfulVote, number> {
  return arr.reduce(
    (acc: Record<MeaningfulVote, number>, index) => {
      acc.abstain += index.abstain;
      acc.answer1 += index.answer1;
      acc.answer2 += index.answer2;
      return acc;
    },
    {
      abstain: 0,
      answer1: 0,
      answer2: 0,
    },
  );
}

function getCountVoteStatus(voteIndex: Record<MeaningfulVote, number>): CountVoteStatus {
  return voteIndex.answer1 === voteIndex.answer2
    ? "draw"
    : voteIndex.answer1 > voteIndex.answer2
    ? "answer1"
    : "answer2";
}
