import { CountInfo } from "@/app/lib/voteDefinitions";

export function defaultCountInfo(): CountInfo {
  return {
    affiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
    unaffiliatedCounts: ["unaffiliated"],
  };
}
