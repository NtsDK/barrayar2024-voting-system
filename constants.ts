import {
  CouncilSessionStatus,
  SessionQuestionStatus,
  SessionQuestionType,
} from "./app/lib/definitions2";

export const ZERO_UUID = "00000000-0000-0000-0000-000000000000";

export const COUNCIL_SESSION_STATUS_I18N: Record<CouncilSessionStatus, string> =
  {
    countessVoting: "Голосование графинь",
    countVoting: "Голосование графов",
    finished: "Завершено",
    planned: "Запланировано",
    preparing: "Подготовка",
  };

export const SESSION_QUESTION_STATUS_I18N: Record<
  SessionQuestionStatus,
  string
> = {
  answer1: "Ответ 1",
  answer2: "Ответ 2",
  canceled: "Вопрос снят",
  raised: "Поднят",
  rescheduling: "Перенос",
};

export const SESSION_QUESTION_TYPE_I18N: Record<SessionQuestionType, string> = {
  master: "Мастерский",
  player: "Игроцкий",
};
