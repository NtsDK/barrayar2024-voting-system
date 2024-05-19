import {
  CountVoteStatus,
  CountessesVoteLog,
  CountsVoteLog,
  Vote,
  VoteComputeResult,
} from "./voteDefinitions";

export default function computeVotes(
  countVoteLog: CountsVoteLog,
  countessesVoteLog: CountessesVoteLog
): VoteComputeResult {
  const countIndex = Object.values(countVoteLog).reduce(
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
  if (countIndex.notFilled > 0) {
    return "notAllCountVotes";
  }

  const countVoteStatus: CountVoteStatus =
    countIndex.answer1 === countIndex.answer2
      ? "draw"
      : countIndex.answer1 > countIndex.answer2
      ? "answer1"
      : "answer2";

  // считаем голоса аффилированных графов

  const countessIndex: Record<Vote, number> = {
    answer1: 0,
    answer2: 0,
    notFilled: 0,
    abstain: 0,
    absent: 0,
  };

  countessesVoteLog.forEach(({ affiliatedCounts, vorHouseId }) => {
    affiliatedCounts.forEach((voteType) => {
      switch (voteType) {
        // ничего не делаем
        // case "unaffiliated":
        case "answer1": {
          countessIndex.answer1++;
          break;
        }
        case "answer2": {
          countessIndex.answer2++;
          break;
        }
        case "abstain": {
          countessIndex.abstain++;
          break;
        }
        case "forCount": {
          const countVote = countVoteLog[vorHouseId].vote;
          if (countVote === "answer1" || countVote === "answer2") {
            countessIndex[countVote]++;
          }
          break;
        }
        case "againstCount": {
          const countVote = countVoteLog[vorHouseId].vote;
          if (countVote === "answer1" || countVote === "answer2") {
            countessIndex[countVote === "answer1" ? "answer2" : "answer1"]++;
          }
          break;
        }
      }
    });
  });

  // считаем голоса неаффилированных графов
  const familyNumber = Object.values(countVoteLog).length;
  let unaffiliatedCountsNumber = (familyNumber - countessesVoteLog.length) * 3;
  countessesVoteLog.forEach(({ affiliatedCounts, vorHouseId }) => {
    unaffiliatedCountsNumber += affiliatedCounts.filter(
      (el) => el === "unaffiliated"
    ).length;
  });

  return countVoteStatus;
}
