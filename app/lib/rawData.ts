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
    familyName: "Форбреттен",
    count_id: "vorbretten_alan",
    countess_id: "vorbretten_eliza",
  },
];

export const votingQuestions: VotingQuestion[] = [
  {
    id: "question1",
    type: "player",
    questionText: "Должен ли любимый конь императора стать графом?",
    answer1: "Да, с присвоением титула и фамилии граф Форовсов",
    answer1Advocate_id: "vorbarra_urii",
    answer2: "Да, с присвоением титула и фамилии графиня Форскакунаева",
    answer2Advocate_id: null,
    status: "raised",
    voteLog: "",
  },
];

export const councilVotings: CouncilVoting[] = [
  {
    id: "voting1",
    dateTime: "",
    question1_id: "question1",
    question2_id: null,
    question3_id: null,
    status: "planned",
  },
];
