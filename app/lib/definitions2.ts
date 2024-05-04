// игровой персонаж
export type Person = {
  id: string;
  // имя персонажа
  name: string;
  comment: string;
};

// фор-дом?
export type VorHouse = {
  id: string;
  // фамилия
  family_name: string;
  // id графа
  count_id: string | null;
  // id графини
  countess_id: string | null;
};

// Голосование совета
export type CouncilVoting = {
  id: string;
  // нужно ли человеко-читаемое название?
  // время начала голосования
  dateTime: string;
  // состояние голосования
  // запланировано, подготовка, голосование графинь, голосование графов, завершено
  status:
    | "planned"
    | "preparing"
    | "countessVoting"
    | "countVoting"
    | "finished";
};

// вопросы на голосовании
export type VotingQuestion = {
  id: string;
  // id голосования
  voting_id: string;
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: "master" | "player";
  // вопрос на голосовании
  question_text: string;
  // ответ 1
  answer1: string;
  // адвокат ответа 1
  answer1_advocate_id: string | null;
  // ответ 2
  answer2: string;
  // адвокат ответа 2
  answer2_advocate_id: string | null;
  // итог/статус вопроса
  // поднят, ответ1, ответ2, перенос, вопрос снят
  status: "raised" | "answer1" | "answer2" | "rescheduling" | "canceled";
  // итог голосования
  vote_log: string;
};

// #region производные типы

// соединение vorHouses и persons
export type VorHousesTable = {
  id: string;
  family_name: string;
  count_id: string | null;
  count_name: string | null;
  countess_id: string | null;
  countess_name: string | null;
};
