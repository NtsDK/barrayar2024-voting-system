import {
  CouncilVoting,
  Person,
  VorHouse,
  VotingQuestion,
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
  },
];

export const votingQuestions: VotingQuestion[] = [
  {
    id: "question1",
    voting_id: "voting1",
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

export const councilVotings: CouncilVoting[] = [
  {
    id: "voting1",
    date_time: "",
    status: "planned",
  },
];
