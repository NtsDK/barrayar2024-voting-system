import { VotingStatus } from "./app/lib/definitions2";

export const ZERO_UUID = "00000000-0000-0000-0000-000000000000";

export const VOTING_STATUS_I18N: Record<VotingStatus, string> = {
  countessVoting: "Голосование графинь",
  countVoting: "Голосование графов",
  finished: "Завершено",
  planned: "Запланировано",
  preparing: "Подготовка",
};
