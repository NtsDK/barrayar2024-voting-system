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
  // социальный капитал семьи
  social_capital: number;
};

// Голосование совета
export type CouncilVoting = {
  id: string;
  // название
  title: string;
  // время начала голосования
  date_time: string;
  // состояние голосования
  status: CouncilVotingStatus;
};

/** запланировано, подготовка, голосование графинь, голосование графов, завершено */
export type CouncilVotingStatus =
  | "planned"
  | "preparing"
  | "countessVoting"
  | "countVoting"
  | "finished";

// вопросы на голосовании
export type VotingQuestion = {
  id: string;
  // id голосования
  voting_id: string;
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: VotingQuestionType;
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
  // состояние вопроса
  status: VotingQuestionStatus;
  // итог голосования
  vote_log: string;
};

export type VotingQuestionType = "master" | "player";

/** поднят, ответ1, ответ2, перенос, вопрос снят */
export type VotingQuestionStatus =
  | "raised"
  | "answer1"
  | "answer2"
  | "rescheduling"
  | "canceled";

// #region производные типы

// соединение vorHouses и persons
export type VorHousesTable = {
  id: string;
  family_name: string;
  count_id: string | null;
  count_name: string | null;
  countess_id: string | null;
  countess_name: string | null;
  social_capital: number;
};

// соединение CouncilVoting и VotingQuestion
export type CouncilVotingsList = {
  id: string;
  // название
  title: string;
  // время начала голосования
  date_time: string;
  // состояние голосования
  status: CouncilVotingStatus;
  questions: VotingQuestionsList[];
};

// соединение VotingQuestion и Person
export type VotingQuestionsList = {
  id: string;
  // id голосования
  voting_id: string;
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: VotingQuestionType;
  // вопрос на голосовании
  question_text: string;
  // ответ 1
  answer1: string;
  // адвокат ответа 1
  answer1_advocate_id: string | null;
  answer1_advocate_name: string | null;
  // ответ 2
  answer2: string;
  // адвокат ответа 2
  answer2_advocate_id: string | null;
  answer2_advocate_name: string | null;
  // итог/статус вопроса
  // состояние вопроса
  status: VotingQuestionStatus;
  // итог голосования
  vote_log: string;
};

// принцесса
export type Princess = {
  id: string;
  // имя принцессы
  name: string;
  // позитивный социальный капитал
  positive_social_capital: number;
  // негативный социальный капитал
  negative_social_capital: number;
};

// таблица членов и друзей форсемьи
export type VorHouseMembersTable = {
  // id фор семьи
  house_id: string;
  // id персонажа
  person_id: string;
  // имя персонажа
  person_name: string;
};

// список персонажей с указанием к какой фор семье они относятся, если это применимо
export type PersonWithVorHouseTable = {
  // id персонажа
  person_id: string;
  // имя персонажа
  person_name: string;
  // id фор семьи
  house_id: string | null;
  // фамилия фор семьи
  house_name: string | null;
};
