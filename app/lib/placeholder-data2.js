const idMapping = {
  "vorbretten_alan": "d16c9446-7139-4cfd-9767-8e2fc76e9d86",
  "vorbretten_eliza": "d91e64d2-aaa5-4b5f-abdf-d8906cf17cae",
  "vorbarra_urii": "6e61eb0b-868b-400e-941d-0a6e68103b98",
  "house_vorbretten": "50f1246a-65aa-4f8a-a9b5-018dcff1d58c",
  "question1": "dc6004a1-669f-46c1-af1d-3e45b6212037",
  "voting1": "4535a18c-279d-49e9-b3b0-f856a4e2ddc4",
  // : "572208af-8ac7-4625-b445-dec1fba1e9b1",
  // : "cdae38e5-69c8-4bd0-8c78-a78a0767b23d",
  // : "f9426f75-5c9c-4c96-97f3-82cbd5267720",
  // : "4003f112-4f68-445f-a6b1-ddcceaa8566d",
}

const persons = [
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

const vorHouses = [
  {
    id: "house_vorbretten",
    familyName: "Форбреттен",
    count_id: "vorbretten_alan",
    countess_id: "vorbretten_eliza",
  },
];

const votingQuestions = [
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

const councilVotings = [
  {
    id: "voting1",
    dateTime: "asd",
    question1_id: "question1",
    question2_id: null,
    question3_id: null,
    status: "planned",
  },
];

module.exports = {
  idMapping,
  persons,
  vorHouses,
  votingQuestions,
  councilVotings,
};