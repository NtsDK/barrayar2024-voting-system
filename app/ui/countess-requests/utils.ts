import { CountessQuestionRequest } from "@/app/lib/voteDefinitions";

export function defaultCountessQuestionRequest(): CountessQuestionRequest {
  return {
    affiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
    unaffiliatedCounts: ["unaffiliated"],
  };
}
