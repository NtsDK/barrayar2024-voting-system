import { assert } from "./utils";
import {
  AffiliatedCount,
  CountVoteStatus,
  CountessActions,
  CountessQuestionRequest,
  // CountessesVoteLog,
  CountsVoteLog,
  Vote,
  // VoteComputeResult,
} from "./voteDefinitions";

export function canPrecomputeVotes(countVoteLog: CountsVoteLog) {
  return Object.values(countVoteLog).every((vote) => vote.vote !== "notFilled");
}

export default function precomputeVotes(
  countVoteLog: CountsVoteLog,
  countessesVoteLog: CountessQuestionRequest[],
  socCapitalValues: Record<CountessActions, number>
): CountVoteStatus {
  assert(canPrecomputeVotes(countVoteLog), "Есть незаполненные графы");

  const { countVoteIndex, countVoteStatus } = computeCountVotes(countVoteLog);

  // считаем голоса аффилированных графов
  // const { affiliatedCountessIndex, unaffiliatedCountsByCountesses } =
  //   computeAffiliatedCountVotes(countVoteLog, countessesVoteLog);

  // считаем голоса неаффилированных графов

  return countVoteStatus;
}

// export function computeAffiliatedCountVotes(
//   countVoteLog: CountsVoteLog,
//   countessesVoteLog: CountessQuestionRequest[]
// ) {
//   const affiliatedCountessIndex: Record<
//     Exclude<Vote, "notFilled" | "absent">,
//     number
//   > = {
//     answer1: 0,
//     answer2: 0,
//     abstain: 0,
//   };

//   let unaffiliatedCountsByCountesses = 0;

//   countessesVoteLog.forEach(({ affiliatedCounts, vorHouseId }) => {
//     const countVote = countVoteLog[vorHouseId].vote;
//     affiliatedCounts.forEach((voteType) => {
//       switch (voteType) {
//         // ничего не делаем
//         case "unaffiliated":
//           unaffiliatedCountsByCountesses++;
//           break;
//         case "answer1": {
//           affiliatedCountessIndex.answer1++;
//           break;
//         }
//         case "answer2": {
//           affiliatedCountessIndex.answer2++;
//           break;
//         }
//         case "abstain": {
//           if (countVote === "absent") {
//             unaffiliatedCountsByCountesses++;
//           } else {
//             affiliatedCountessIndex.abstain++;
//           }
//           break;
//         }
//         case "forCount": {
//           if (countVote === "absent") {
//             unaffiliatedCountsByCountesses++;
//           } else if (countVote === "answer1" || countVote === "answer2") {
//             affiliatedCountessIndex[countVote]++;
//           }
//           break;
//         }
//         case "againstCount": {
//           if (countVote === "absent") {
//             unaffiliatedCountsByCountesses++;
//           } else if (countVote === "answer1" || countVote === "answer2") {
//             affiliatedCountessIndex[
//               countVote === "answer1" ? "answer2" : "answer1"
//             ]++;
//           }
//           break;
//         }
//       }
//     });
//   });

//   return {
//     affiliatedCountessIndex,
//     unaffiliatedCountsByCountesses,
//   };
// }

export function computeCountVotes(countVoteLog: CountsVoteLog) {
  const countVoteIndex = Object.values(countVoteLog).reduce(
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

  const countVoteStatus: CountVoteStatus =
    countVoteIndex.answer1 === countVoteIndex.answer2
      ? "draw"
      : countVoteIndex.answer1 > countVoteIndex.answer2
      ? "answer1"
      : "answer2";

  return {
    countVoteIndex,
    countVoteStatus,
  };
}
