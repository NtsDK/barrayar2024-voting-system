// Заявка графини на голосование в базе
export type CountessSessionRequest = {
  id: string;
  // id фор семьи
  house_id: string;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // строковое представление запроса
  question_requests: string;
};

// Заявка графини на голосование для интерфейса
export type CountessSessionRequestTable = {
  id: string;
  // id фор семьи
  house_id: string;
  // фамилия фор семьи
  house_name: string;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // строковое представление запроса
  question_requests: string;
};

export type CountessSessionRequestTable2 = {
  id: string;
  // id фор семьи
  house_id: string;
  // фамилия фор семьи
  house_name: string;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // строковое представление запроса
  question_requests: Record<string, CountessQuestionRequest>;
};

export type Vote = "notFilled" | "answer1" | "answer2" | "abstain" | "absent";

export type VoteLog = {
  counts: Record<string, { vote: Vote; familyName: string }>;
  countesses: CountessQuestionRequest[];
  // TODO result
};

export type CountsVoteLog = VoteLog["counts"];
export type CountessesVoteLog = VoteLog["countesses"];

export type CountessQuestionRequest = {
  vorHouseId: string;
  familyName: string;
  affiliatedCounts: AffiliatedCount[];
  unaffiliatedCounts: UnaffiliatedCount[];
};

export type AffiliatedCount =
  | "unaffiliated" // свободный
  | "abstain" // воздержаться
  | "forCount" // за графа
  | "againstCount" // против графа
  | "answer1" // вариант1
  | "answer2"; // вариант2;

export type UnaffiliatedCount =
  | "unaffiliated" // свободный
  | "forCount" // за графа
  | "againstCount" // против графа
  | "answer1" // вариант1
  | "answer2"; // вариант2;

export type CountVoteStatus = "answer1" | "answer2" | "draw";

export type VoteComputeResult = CountVoteStatus | "notAllCountVotes";
