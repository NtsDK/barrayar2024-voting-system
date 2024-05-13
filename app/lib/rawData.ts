import {
  CouncilSession,
  Person,
  VorHouse,
  SessionQuestion,
} from "./definitions2";

export const persons: Person[] = [
  {
    id: "vorbretten_alan",
    name: "Алан Форбреттен",
    comment: "",
  },
  {
    id: "vorbretten_eliza",
    name: "Элиза Форбреттен",
    comment: "",
  },
  {
    id: "vorbarra_urii",
    name: "Юрий Форбарра",
    comment: "",
  },
];

export const vorHouses: VorHouse[] = [
  {
    id: "house_vorbretten",
    family_name: "Форбреттен",
    count_id: "vorbretten_alan",
    countess_id: "vorbretten_eliza",
    social_capital: 100,
  },
];

export const sessionQuestions: SessionQuestion[] = [
  {
    id: "question1",
    session_id: "session1",
    type: "player",
    question_text: "Должен ли любимый конь императора стать графом?",
    answer1: "Да, с присвоением титула и фамилии граф Форовсов",
    answer1_advocate_id: "vorbarra_urii",
    answer2: "Да, с присвоением титула и фамилии графиня Форскакунаева",
    answer2_advocate_id: null,
    status: "raised",
    vote_log: "",
  },
];

export const councilSessions: CouncilSession[] = [
  {
    id: "session1",
    title: "",
    date_time: "",
    status: "planned",
  },
];
