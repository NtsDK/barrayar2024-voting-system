// https://www.uuidgenerator.net/version4

const idMapping = {
  "vorbarra_urii": "6e61eb0b-868b-400e-941d-0a6e68103b98",

  "vorbretten_alan": "d16c9446-7139-4cfd-9767-8e2fc76e9d86",
  "vorbretten_eliza": "d91e64d2-aaa5-4b5f-abdf-d8906cf17cae",
  "vorbretten_filipp": "e9edd7c5-a313-4b90-bbe0-387fe12dc97d",
  "vorbretten_rene": "33bdb7e3-ade2-4477-841a-826dbc2e790a",
  "vorbretten_estella": "700aa18f-dc0c-4da2-8f07-3c2778edeba2",

  "vordarian_isaak": "44c3b402-1989-442a-8944-7c1f9145a19b",
  "vordarian_luis": "6227f47c-4bfb-43ed-ae48-f7d825591ed9",
  "vordarian_ustinia": "97000d24-bfe2-46ea-bd76-73ab5a1dc897",

  "vorvolinkin_arsenii": "1ede04a4-0b02-4df6-8fa3-4fb49230b2e2",
  "vorvolinkin_esenia": "b1d17eaf-2dac-414c-a8e5-b52916c7151f",
  "vorvolinkin_olga": "7fb5bfd4-919e-401d-aa53-d228ccd58a0b",
  "vorvolinkin_filat": "4c989391-b98a-48bb-8efe-fa794e2403a5",


  "house_vorbretten": "50f1246a-65aa-4f8a-a9b5-018dcff1d58c",
  "house_vorvolinkin": "586c3352-022c-462b-9ad0-91e37c221bbc",
  "house_vordarian": "7a0a29a2-d2b3-40c3-8ace-5d48186bf145",


  "question1": "dc6004a1-669f-46c1-af1d-3e45b6212037",
  "voting1": "4535a18c-279d-49e9-b3b0-f856a4e2ddc4",
  // : "572208af-8ac7-4625-b445-dec1fba1e9b1",
  // : "cdae38e5-69c8-4bd0-8c78-a78a0767b23d",
  // : "f9426f75-5c9c-4c96-97f3-82cbd5267720",
  // : "4003f112-4f68-445f-a6b1-ddcceaa8566d",
}

const persons = [
  {
    id: "vorbarra_urii",
    name: "Юрий Форбарра",
    comment: "",
  },

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
    id: "vorbretten_filipp",
    name: "Филипп Форбреттен",
    comment: "",
  },
  {
    id: "vorbretten_rene",
    name: "Рене Форбреттен",
    comment: "",
  },
  {
    id: "vorbretten_estella",
    name: "Эстелла Форбреттен",
    comment: "",
  },

  {
    id: "vordarian_isaak",
    name: "Айзек Фордариан",
    comment: "",
  },
  {
    id: "vordarian_luis",
    name: "Луи Фордариан",
    comment: "",
  },
  {
    id: "vordarian_ustinia",
    name: "Юстиния Фордариан",
    comment: "",
  },

  {
    id: "vorvolinkin_arsenii",
    name: "Арсений Форволынкин",
    comment: "",
  },
  {
    id: "vorvolinkin_esenia",
    name: "Есения Форволынкина",
    comment: "",
  },
  {
    id: "vorvolinkin_olga",
    name: "Ольга Форволынкина",
    comment: "",
  },
  {
    id: "vorvolinkin_filat",
    name: "Филат Форволынкин",
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
  {
    id: "house_vorvolinkin",
    familyName: "Форволынкин",
    count_id: "vorvolinkin_arsenii",
    countess_id: "vorvolinkin_esenia",
  },
  {
    id: "house_vordarian",
    familyName: "Фордариан",
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