import { CouncilSessionStatus, SessionQuestionStatus, SessionQuestionType } from "./app/lib/definitions2";
import {
  AffiliatedCount,
  AffiliatedCountVoteLogItem,
  CountVoteStatus,
  UnaffiliatedCount,
  UnaffiliatedCountVoteLogItem,
  Vote,
} from "./app/lib/voteDefinitions";

export const ZERO_UUID = "00000000-0000-0000-0000-000000000000";

export const COUNCIL_SESSION_STATUS_I18N: Record<CouncilSessionStatus, string> = {
  countessVoting: "Голосование графинь",
  countVoting: "Голосование графов",
  finished: "Завершено",
  planned: "Запланировано",
  preparing: "Подготовка",
};

export const SESSION_QUESTION_STATUS_I18N: Record<SessionQuestionStatus, string> = {
  answer1: "Ответ 1",
  answer2: "Ответ 2",
  canceled: "Вопрос снят",
  raised: "Поднят",
  rescheduling: "Перенос",
};

export const VOTE_I18N: Record<Vote, string> = {
  answer1: "Ответ 1",
  answer2: "Ответ 2",
  absent: "Отсутствует",
  abstain: "Воздержался",
  notFilled: "Не заполнено",
};

export const SESSION_QUESTION_TYPE_I18N: Record<SessionQuestionType, string> = {
  master: "Мастерский",
  player: "Игроцкий",
};

export const COUNT_VOTE_STATUS_I18N: Record<CountVoteStatus, string> = {
  answer1: "Ответ 1",
  answer2: "Ответ 2",
  draw: "Равенство голосов",
};

export const COUNT_VOTE_REQUEST_I18N: Record<AffiliatedCount | UnaffiliatedCount, string> = {
  unaffiliated: "Свободный",
  abstain: "Воздержаться",
  forCount: "За графа",
  againstCount: "Против графа",
  answer1: "Ответ 1",
  answer2: "Ответ 2",
};

export const REQUEST_STATUS_I18N: Record<
  AffiliatedCountVoteLogItem["type"] | UnaffiliatedCountVoteLogItem["type"],
  string
> = {
  vote: "Применена",
  absence: "Не применена по неявке графа на заседание",
  noFreeCounts: "Не применена по отсутствию свободных графов",
};
