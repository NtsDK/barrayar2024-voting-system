import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import {
  AffiliatedCountVoteLogItem,
  CountVoteStatus,
  CountessQuestionRequest,
  CountsVoteLog,
  PrecomputeVotesResult,
  QuestionRequests,
  SocCapCostsSettings,
  SocCapitalExpenseRecord,
  UnaffiliatedCountVoteLogItem,
  VoteLog,
  VoteSummaryRow,
} from "./voteDefinitions";

const ajv = new Ajv({
  allErrors: true,
  // removeAdditional: true,
  // useDefaults: true
});
addFormats(ajv);

const countessQuestionRequestSchema: JSONSchemaType<CountessQuestionRequest> = {
  type: "object",
  properties: {
    // familyName: { type: "string" },
    // vorHouseId: { type: "string" },
    affiliatedCounts: {
      type: "array",
      items: {
        type: "string",
        enum: ["unaffiliated", "abstain", "forCount", "againstCount", "answer1", "answer2"],
      },
    },
    unaffiliatedCounts: {
      type: "array",
      items: {
        type: "string",
        enum: ["unaffiliated", "forCount", "againstCount", "answer1", "answer2"],
      },
    },
  },
  required: [
    // "vorHouseId",
    // "familyName",
    "affiliatedCounts",
    "unaffiliatedCounts",
  ],
  additionalProperties: false,
};

// export const validateCountessQuestionRequest = ajv.compile(
//   countessQuestionRequestSchema
// );

const questionRequestsSchema: JSONSchemaType<QuestionRequests> = {
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
      JSON.stringify(validateQuestionRequests.errors, null, "  "),
    );

    throw new Error(
      "Parse resource error: " + question_requests + ", " + JSON.stringify(validateQuestionRequests.errors, null, "  "),
    );
  }
}

const countsVoteLogSchema: JSONSchemaType<CountsVoteLog> = {
  type: "object",
  additionalProperties: {
    type: "object",
    properties: {
      familyName: { type: "string" },
      vote: { type: "string", enum: ["absent", "notFilled", "abstain", "answer1", "answer2"] },
    },
    required: ["familyName", "vote"],
  },
  required: [],
};

const countVoteStatusSchema: JSONSchemaType<CountVoteStatus> = {
  type: "string",
  enum: ["answer1", "answer2", "draw"],
};
// @ts-ignore
const voteSummaryRowSchema: JSONSchemaType<VoteSummaryRow> = {
  type: "object",
  properties: {
    name: { type: "string" },
    voteIndex: {
      type: "object",
      additionalProperties: { type: "number" },
      required: ["abstain", "answer1", "answer2"],
    },
    voteStatus: countVoteStatusSchema,
  },
  required: ["name", "voteIndex"],

  additionalProperties: false,
};
const socCapitalExpenseRecordSchema: JSONSchemaType<SocCapitalExpenseRecord> = {
  type: "object",
  properties: {
    house_id: { type: "string" },
    house_name: { type: "string" },
    affiliatedCountsExpenses: { type: "number" },
    unaffiliatedCountsExpenses: { type: "number" },
    totalCountsExpenses: { type: "number" },
  },
  required: ["house_id", "house_name", "affiliatedCountsExpenses", "unaffiliatedCountsExpenses", "totalCountsExpenses"],
  additionalProperties: false,
};
const affiliatedCountVoteLogItemSchema: JSONSchemaType<AffiliatedCountVoteLogItem> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["absence", "vote"] },
    voteType: { type: "string", enum: ["abstain", "againstCount", "answer1", "answer2", "forCount", "unaffiliated"] },
    timestamp: { type: "object", format: "date-time", required: [] },
    house_name: { type: "string" },
    socialCapitalChange: { type: "number" },
    countVote: { type: "string", enum: ["absent", "abstain", "answer1", "answer2", "notFilled"] },
    appliedVote: { type: "string", enum: ["answer1", "answer2", "abstain"], nullable: true },
  },
  required: ["type", "voteType", "timestamp", "house_name", "socialCapitalChange", "countVote"],
  additionalProperties: false,
};
const unaffiliatedCountVoteLogItemSchema: JSONSchemaType<UnaffiliatedCountVoteLogItem> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["absence", "vote", "noFreeCounts"] },
    voteType: { type: "string", enum: ["againstCount", "answer1", "answer2", "forCount", "unaffiliated"] },
    timestamp: { type: "object", format: "date-time", required: [] },
    house_name: { type: "string" },
    socialCapitalChange: { type: "number" },
    countVote: { type: "string", enum: ["absent", "abstain", "answer1", "answer2", "notFilled"] },
    appliedVote: { type: "string", enum: ["answer1", "answer2", "abstain"], nullable: true },
  },
  required: ["type", "voteType", "timestamp", "house_name", "socialCapitalChange", "countVote"],
  additionalProperties: false,
};
const precomputeVotesResultSchema: JSONSchemaType<PrecomputeVotesResult> = {
  type: "object",
  properties: {
    summary: {
      type: "array",
      items: voteSummaryRowSchema,
    },
    questionStatus: {
      type: "string",
      enum: ["answer1", "answer2", "canceled", "raised", "rescheduling"],
    },
    socCapitalExpenses: {
      type: "array",
      items: socCapitalExpenseRecordSchema,
    },
    countessQuestionRequestsCount: { type: "number" },
    affiliatedCountsVoteLog: {
      type: "array",
      items: affiliatedCountVoteLogItemSchema,
    },
    unaffiliatedCountsByCountesses: { type: "number" },
    unaffiliatedCountsByRequestsAbsense: { type: "number" },
    totalUnaffiliatedCounts: { type: "number" },
    unaffiliatedCountsVoteLog: {
      type: "array",
      items: unaffiliatedCountVoteLogItemSchema,
    },
    restUnaffiliatedCounts: { type: "number" },
    masterVote: {
      type: "string",
      enum: ["abstain", "answer1", "answer2"],
    },
  },
  required: [
    "affiliatedCountsVoteLog",
    "countessQuestionRequestsCount",
    "masterVote",
    "questionStatus",
    "restUnaffiliatedCounts",
    "socCapitalExpenses",
    "summary",
    "totalUnaffiliatedCounts",
    "unaffiliatedCountsByCountesses",
    "unaffiliatedCountsByRequestsAbsense",
    "unaffiliatedCountsVoteLog",
  ],
  additionalProperties: false,
};

const voteLogSchema: JSONSchemaType<VoteLog> = {
  type: "object",
  properties: {
    counts: { ...countsVoteLogSchema, nullable: true },
    precomputeVotesResult: { ...precomputeVotesResultSchema, nullable: true },
  },
  required: [],
};

export const validateVoteLog = ajv.compile(voteLogSchema);

export function assertVoteLog(vote_log: any) {
  if (!validateVoteLog(vote_log)) {
    console.error("Parse resource error", vote_log, JSON.stringify(validateVoteLog.errors, null, "  "));

    throw new Error("Parse resource error: " + vote_log + ", " + JSON.stringify(validateVoteLog.errors, null, "  "));
  }
}

const socCapCostsSettingsSchema: JSONSchemaType<SocCapCostsSettings> = {
  type: "object",
  properties: {
    affiliated_abstain: { type: "number" },
    affiliated_againstCount: { type: "number" },
    affiliated_answer1: { type: "number" },
    affiliated_answer2: { type: "number" },
    affiliated_forCount: { type: "number" },
    affiliated_unaffiliated: { type: "number" },
    unaffiliated_againstCount: { type: "number" },
    unaffiliated_answer1: { type: "number" },
    unaffiliated_answer2: { type: "number" },
    unaffiliated_forCount: { type: "number" },
    unaffiliated_unaffiliated: { type: "number" },
  },
  required: [
    "affiliated_abstain",
    "affiliated_againstCount",
    "affiliated_answer1",
    "affiliated_answer2",
    "affiliated_forCount",
    "affiliated_unaffiliated",
    "unaffiliated_againstCount",
    "unaffiliated_answer1",
    "unaffiliated_answer2",
    "unaffiliated_forCount",
    "unaffiliated_unaffiliated",
  ],
};

export const validateSocCapCostsSettings = ajv.compile(socCapCostsSettingsSchema);

export function assertSocCapCostsSettings(socCapCostsSettings: any) {
  if (!validateSocCapCostsSettings(socCapCostsSettings)) {
    console.error(
      "Parse resource error",
      socCapCostsSettings,
      JSON.stringify(validateSocCapCostsSettings.errors, null, "  "),
    );

    throw new Error(
      "Parse resource error: " +
        socCapCostsSettings +
        ", " +
        JSON.stringify(validateSocCapCostsSettings.errors, null, "  "),
    );
  }
}
