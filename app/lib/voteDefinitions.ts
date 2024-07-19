import { SessionQuestionStatus } from "./definitions2";

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
  // социальный капитал фор семьи
  house_social_capital: number;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // строковое представление запроса
  question_requests: string;
};

// индекс по id запроса
export type QuestionRequests = Record<string, CountessQuestionRequest>;

export type CountessSessionRequestTable2 = {
  id: string;
  // id фор семьи
  house_id: string;
  // фамилия фор семьи
  house_name: string;
  // социальный капитал фор семьи
  house_social_capital: number;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // заявка графини на все вопросы
  question_requests: QuestionRequests;
};

// Заявка графини на голосование по конкретному вопросу.
// Используется в подсчете голосов.
export type CountessQuestionRequestTable = {
  id: string;
  // id фор семьи
  house_id: string;
  // фамилия фор семьи
  house_name: string;
  // id голосования
  session_id: string;
  // время внесения заявки
  timestamp: Date;
  // id вопроса
  question_id: string;
  // свои графы
  affiliatedCounts: CountessQuestionRequest["affiliatedCounts"];
  // свободные графы
  unaffiliatedCounts: CountessQuestionRequest["unaffiliatedCounts"];
};

export type MeaningfulVote = "answer1" | "answer2" | "abstain";

export type Vote = MeaningfulVote | "notFilled" | "absent";

export type VoteLog = {
  /** Индекс по id фордомов */
  counts?: CountsVoteLog;
  precomputeVotesResult?: PrecomputeVotesResult;
};

export type CountsVoteLog = Record<string, { vote: Vote; familyName: string }>;
// export type CountessesVoteLog = VoteLog["countesses"];

export type CountessQuestionRequest = {
  // свои графы
  affiliatedCounts: AffiliatedCount[];
  // свободные графы
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

// export type VoteComputeResult = CountVoteStatus | "notAllCountVotes";

export type CountessActions = `affiliated_${AffiliatedCount}` | `unaffiliated_${UnaffiliatedCount}`;

export const socCapCostsSettingsDefault: Record<CountessActions, number> = {
  affiliated_unaffiliated: 0,
  affiliated_abstain: 5,
  affiliated_forCount: 10,
  affiliated_againstCount: 10,
  affiliated_answer1: 20,
  affiliated_answer2: 20,
  unaffiliated_unaffiliated: 0,
  unaffiliated_forCount: 20,
  unaffiliated_againstCount: 20,
  unaffiliated_answer1: 40,
  unaffiliated_answer2: 40,
};

export type SocCapCosts = {
  id: string;
  // Цены на соц кап строкой
  settings: string;
};

export type SocCapCostsSettings = Record<CountessActions, number>;

export type SocCapCostsTable = {
  id: string;
  // Цены на соц кап
  settings: SocCapCostsSettings;
};

/** Элемент подведения итога голосования */
export type VoteSummaryRow = {
  name: string;
  voteIndex: Record<MeaningfulVote, number>;
  voteStatus?: CountVoteStatus;
};

/** Информация по учету голоса своего графа */
export type AffiliatedCountVoteLogItem = {
  type: "vote" | "absence";
  voteType: AffiliatedCount;
  timestamp: Date;
  house_name: string;
  socialCapitalChange: number;
  countVote: Vote;
  appliedVote?: MeaningfulVote;
};

/** Информация по учету голоса свободного графа */
export type UnaffiliatedCountVoteLogItem = {
  type: "vote" | "absence" | "noFreeCounts";
  voteType: UnaffiliatedCount;
  timestamp: Date;
  house_name: string;
  socialCapitalChange: number;
  countVote: Vote;
  appliedVote?: MeaningfulVote;
};

// Хранит информацию по расходам соц капитала в одном голосовании. Ключ house_id
export type SocCapitalExpenses = Record<string, { house_name: string; expenses: number }>;

export type PrecomputeVotesResult = {
  // суммаризация
  summary: VoteSummaryRow[];
  questionStatus: SessionQuestionStatus;
  socCapitalExpenses: SocCapitalExpenseRecord[];
  // голосование графинь
  countessQuestionRequestsCount: number;
  // голосование аффилированных графов
  affiliatedCountsVoteLog: AffiliatedCountVoteLogItem[];
  // голосование неаффилированных графов
  unaffiliatedCountsByCountesses: number;
  unaffiliatedCountsByRequestsAbsense: number;
  totalUnaffiliatedCounts: number;
  unaffiliatedCountsVoteLog: UnaffiliatedCountVoteLogItem[];
  restUnaffiliatedCounts: number;
  // голос мастера
  masterVote: MeaningfulVote;
};

/** Информация о суммарном расходе соц капитала графини на вопрос */
export type SocCapitalExpenseRecord = {
  house_id: string;
  house_name: string;
  affiliatedCountsExpenses: number;
  unaffiliatedCountsExpenses: number;
  totalCountsExpenses: number;
};
