import {
  CouncilVotingStatus,
  VotingQuestionStatus,
  VotingQuestionType,
} from "./app/lib/definitions2";

export const ZERO_UUID = "00000000-0000-0000-0000-000000000000";

export const COUNCIL_VOTING_STATUS_I18N: Record<CouncilVotingStatus, string> = {
  countessVoting: "Голосование графинь",
  countVoting: "Голосование графов",
  finished: "Завершено",
  planned: "Запланировано",
  preparing: "Подготовка",
};

export const VOTING_QUESTION_STATUS_I18N: Record<VotingQuestionStatus, string> =
  {
    answer1: "Ответ 1",
    answer2: "Ответ 2",
    canceled: "Вопрос снят",
    raised: "Поднят",
    rescheduling: "Перенос",
  };

export const VOTING_QUESTION_TYPE_I18N: Record<VotingQuestionType, string> = {
  master: "Мастерский",
  player: "Игроцкий",
};
