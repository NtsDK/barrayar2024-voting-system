// new types {

// игровой персонаж
export type Person = {
  id: string;
  name: string;
  comment: string;
};

// фор-дом?
export type VorHouse = {
  id: string;
  familyName: string;
  count_id?: string;
  countess_id?: string;
};

// Голосование совета
export type CouncilVoting = {
  id: string;
  // нужно ли человеко-читаемое название?
  // время начала голосования
  dateTime: string;
  // вопросы в повестке
  question1_id: string | null;
  question2_id: string | null;
  question3_id: string | null;
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
  // вопрос может быть мастерским (управляется мастерами) или
  // игроцким (управляется игроками)
  type: "master" | "player";
  // вопрос на голосовании
  questionText: string;
  // ответ 1
  answer1: string;
  // адвокат ответа 1
  answer1Advocate_id: string | null;
  // ответ 2
  answer2: string;
  // адвокат ответа 2
  answer2Advocate_id: string | null;
  // итог/статус вопроса
  // поднят, ответ1, ответ2, перенос, вопрос снят
  status: "raised" | "answer1" | "answer2" | "rescheduling" | "canceled";
  // итог голосования
  voteLog: string;
};

// } new types
