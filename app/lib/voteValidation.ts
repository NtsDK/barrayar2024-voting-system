import Ajv, { JSONSchemaType } from "ajv";
import { CountessQuestionRequest, QuestionRequests } from "./voteDefinitions";

const ajv = new Ajv({
  allErrors: true,
  // removeAdditional: true,
  // useDefaults: true
});

export const countessQuestionRequestSchema: JSONSchemaType<CountessQuestionRequest> =
  {
    type: "object",
    properties: {
      familyName: { type: "string" },
      vorHouseId: { type: "string" },
      affiliatedCounts: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "unaffiliated",
            "abstain",
            "forCount",
            "againstCount",
            "answer1",
            "answer2",
          ],
        },
      },
      unaffiliatedCounts: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "unaffiliated",
            "forCount",
            "againstCount",
            "answer1",
            "answer2",
          ],
        },
      },
    },
    required: [
      "vorHouseId",
      "familyName",
      "affiliatedCounts",
      "unaffiliatedCounts",
    ],
    additionalProperties: false,
  };

// export const validateCountessQuestionRequest = ajv.compile(
//   countessQuestionRequestSchema
// );

export const questionRequestsSchema: JSONSchemaType<QuestionRequests> = {
  type: "object",
  additionalProperties: countessQuestionRequestSchema,
  minProperties: 1,
  required: [],
};

export const validateQuestionRequests = ajv.compile(questionRequestsSchema);

export function assertQuestionRequests(question_requests: any) {
  if (!validateQuestionRequests(question_requests)) {
    console.error(
      "Parse resource error",
      question_requests,
      JSON.stringify(validateQuestionRequests.errors, null, "  ")
    );

    throw new Error(
      "Parse resource error: " +
        question_requests +
        ", " +
        JSON.stringify(validateQuestionRequests.errors, null, "  ")
    );
  }
}
