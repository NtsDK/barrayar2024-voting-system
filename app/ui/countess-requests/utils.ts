import { sum } from "ramda";

import { CountessQuestionRequest, SocCapCostsSettings } from "@/app/lib/voteDefinitions";

export function defaultCountessQuestionRequest(): CountessQuestionRequest {
  return {
    affiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
    unaffiliatedCounts: ["unaffiliated"],
  };
}

export function countSocCapCountInfoList(
  countInfoList: CountessQuestionRequest[],
  socCapCostsSettings: SocCapCostsSettings,
): number {
  return sum(
    countInfoList.map((countessQuestionRequest) => {
      const costs1 = countessQuestionRequest.affiliatedCounts.map((el) => socCapCostsSettings[`affiliated_${el}`]);
      const costs2 = countessQuestionRequest.unaffiliatedCounts.map((el) => socCapCostsSettings[`unaffiliated_${el}`]);
      return sum([...costs1, ...costs2]);
    }),
  );
}
