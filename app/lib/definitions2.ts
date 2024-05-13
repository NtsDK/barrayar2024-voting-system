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
export type CouncilSession = {
  id: string;
  // название
  title: string;
  // время начала голосования
  date_time: string;
  // состояние голосования
  status: CouncilSessionStatus;
};

/** запланировано, подготовка, голосование графинь, голосование графов, завершено */
export type CouncilSessionStatus =
  | "planned"
  | "preparing"
  | "countessVoting"
  | "countVoting"
  | "finished";

// вопросы на голосовании
export type SessionQuestion = {
  id: string;
  // id голосования
  session_id: string;
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: SessionQuestionType;
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
  status: SessionQuestionStatus;
  // итог голосования
  vote_log: string;
};

export type SessionQuestionType = "master" | "player";

/** поднят, ответ1, ответ2, перенос, вопрос снят */
export type SessionQuestionStatus =
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

// соединение CouncilSession и SessionQuestion
export type CouncilSessionsList = {
  id: string;
  // название
  title: string;
  // время начала голосования
  date_time: string;
  // состояние голосования
  status: CouncilSessionStatus;
  questions: SessionQuestionsList[];
};

// соединение SessionQuestion и Person
export type SessionQuestionsList = {
  id: string;
  // id голосования
  session_id: string;
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: SessionQuestionType;
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
  status: SessionQuestionStatus;
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
