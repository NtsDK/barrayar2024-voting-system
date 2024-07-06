// https://www.uuidgenerator.net/version4

const idMapping = {
  vorbarra_urii: "6e61eb0b-868b-400e-941d-0a6e68103b98",

  vorbretten_alan: "d16c9446-7139-4cfd-9767-8e2fc76e9d86",
  vorbretten_eliza: "d91e64d2-aaa5-4b5f-abdf-d8906cf17cae",
  vorbretten_filipp: "e9edd7c5-a313-4b90-bbe0-387fe12dc97d",
  vorbretten_rene: "33bdb7e3-ade2-4477-841a-826dbc2e790a",
  vorbretten_estella: "700aa18f-dc0c-4da2-8f07-3c2778edeba2",

  vordarian_isaak: "44c3b402-1989-442a-8944-7c1f9145a19b",
  vordarian_luis: "6227f47c-4bfb-43ed-ae48-f7d825591ed9",
  vordarian_ustinia: "97000d24-bfe2-46ea-bd76-73ab5a1dc897",

  vorvolinkin_arsenii: "1ede04a4-0b02-4df6-8fa3-4fb49230b2e2",
  vorvolinkin_esenia: "b1d17eaf-2dac-414c-a8e5-b52916c7151f",
  vorvolinkin_olga: "7fb5bfd4-919e-401d-aa53-d228ccd58a0b",
  vorvolinkin_filat: "4c989391-b98a-48bb-8efe-fa794e2403a5",

  house_vorbarra: "bc8518bc-b8a5-4b21-b74c-4045fe67a7ba",
  house_vorbretten: "50f1246a-65aa-4f8a-a9b5-018dcff1d58c",
  house_vorvolinkin: "586c3352-022c-462b-9ad0-91e37c221bbc",
  house_vordarian: "7a0a29a2-d2b3-40c3-8ace-5d48186bf145",
  house_vorkosigan: "f1e027e8-0079-4513-ba44-734775285625",
  house_vorlakial: "c5fc12b8-0ccb-493b-ab26-0cd2111d42a2",
  house_vormuir: "c9665462-ec4d-4e51-8807-0d16473776cd",
  house_vorrobio: "c1551982-2ada-4243-917b-a545b5d13f90",
  house_vorpatril: "69c274da-e0b0-490b-b633-a4ffd4d8b636",
  house_vorpinski: "24bf5326-edf9-42f9-84ee-83c3f604be90",
  house_vorratier: "a071052f-02df-4866-9e13-b485ce5100b5",
  house_vorsmit: "c0125cc4-d61c-41a2-a3d7-abd6a2243a4f",
  house_vortala: "7bd647d1-b52d-43cd-97f1-ee2498b009de",
  house_vortein: "b1174bc7-499e-4f1a-ae19-8ce2771b0525",
  house_vorhalas: "ad63730a-7d42-4e81-af9d-e8dafe066916",
  house_vorhovic: "bef65095-2944-4e7c-b6ba-10fed5259a00",

  session1: "4535a18c-279d-49e9-b3b0-f856a4e2ddc4",
  session2: "9d0037b7-e9ed-433b-b888-74edb46b6210",

  question1: "dc6004a1-669f-46c1-af1d-3e45b6212037",
  question2: "2a6003c5-94c8-4d25-b7c0-8a589f569e92",
  question3: "0ab6524e-6949-4b93-9621-38658c33865e",
  princess_margaret: "a5433d0d-13c6-4d27-a379-93b4058c6bf4",
  princess_beatrice: "6332fa19-c52a-41f0-9f47-a78feb39159e",

  countess_request_1: "9aba1f9d-a164-4503-a033-ad8c9a69bde3",
  countess_request_2: "84ec8afb-f783-4c89-9f13-7fed0671665d",
};

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
    id: "house_vorbarra",
    familyName: "Форбарра",
    socialCapital: 100,
  },
  {
    id: "house_vorbretten",
    familyName: "Форбреттен",
    count_id: "vorbretten_alan",
    countess_id: "vorbretten_eliza",
    socialCapital: 100,
  },
  {
    id: "house_vorvolinkin",
    familyName: "Форволынкин",
    count_id: "vorvolinkin_arsenii",
    countess_id: "vorvolinkin_esenia",
    socialCapital: 100,
  },
  {
    id: "house_vordarian",
    familyName: "Фордариан",
    socialCapital: 100,
  },
  {
    id: "house_vorkosigan",
    familyName: "Форкосиган",
    socialCapital: 100,
  },
  {
    id: "house_vorlakial",
    familyName: "Форлакиал",
    socialCapital: 100,
  },
  {
    id: "house_vormuir",
    familyName: "Формюир",
    socialCapital: 100,
  },
  {
    id: "house_vorrobio",
    familyName: "Форобио",
    socialCapital: 100,
  },
  {
    id: "house_vorpatril",
    familyName: "Форпатрил",
    socialCapital: 100,
  },
  {
    id: "house_vorpinski",
    familyName: "Форпински",
    socialCapital: 100,
  },
  {
    id: "house_vorratier",
    familyName: "Форратьер",
    socialCapital: 100,
  },
  {
    id: "house_vorsmit",
    familyName: "Форсмит",
    socialCapital: 100,
  },
  {
    id: "house_vortala",
    familyName: "Фортала",
    socialCapital: 100,
  },
  {
    id: "house_vortein",
    familyName: "Фортейн",
    socialCapital: 100,
  },
  {
    id: "house_vorhalas",
    familyName: "Форхалас",
    socialCapital: 100,
  },
  {
    id: "house_vorhovic",
    familyName: "Форховиц",
    socialCapital: 100,
  },
];

const councilSessions = [
  {
    id: "session1",
    title: "Первое заседание",
    dateTime: "22 Августа 12:00",
    status: "countessVoting",
  },
  {
    id: "session2",
    title: "Второе заседание",
    dateTime: "23 Августа 14:00",
    status: "planned",
  },
];

const sessionQuestions = [
  {
    id: "question1",
    session_id: "session1",
    type: "player",
    questionText: "1. Должен ли любимый конь императора стать графом?",
    answer1: "Да, с присвоением титула и фамилии граф Форовсов",
    answer1_advocate_id: "vorbarra_urii",
    answer2: "Да, с присвоением титула и фамилии графиня Форскакунаева",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "",
  },
  {
    id: "question2",
    session_id: "session1",
    type: "player",
    questionText: "Разрешить ли использование пентотала на Барраяре?",
    answer1: "Да, разрешить",
    answer1_advocate_id: null,
    answer2: "Нет, не разрешить",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "",
  },
  {
    id: "question3",
    session_id: "session1",
    type: "player",
    questionText: "Как назвать любимую собаку Юры?",
    answer1: "Тузик",
    answer1_advocate_id: null,
    answer2: "Бобик",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "",
  },
];

const princesses = [
  {
    id: "princess_margaret",
    name: "Маргарета",
    positiveSocialCapital: 100,
    negativeSocialCapital: 30,
  },
  {
    id: "princess_beatrice",
    name: "Беатрис",
    positiveSocialCapital: 105,
    negativeSocialCapital: 35,
  },
];

const houseMembers = [
  {
    house_id: "house_vorbretten",
    person_id: "vorbretten_filipp",
  },
  {
    house_id: "house_vorbretten",
    person_id: "vorbretten_rene",
  },
  {
    house_id: "house_vorvolinkin",
    person_id: "vorvolinkin_olga",
  },
];

const countessSessionRequests = [
  {
    id: "countess_request_1",
    house_id: "house_vorlakial",
    session_id: "session1",
    timestamp: new Date("Aug 21 2024 14:15:16"),
    question_requests: JSON.stringify({
      [idMapping["question1"]]: {
        affiliatedCounts: ["unaffiliated", "abstain", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "answer1", "answer2"],
      },
      [idMapping["question2"]]: {
        affiliatedCounts: ["abstain", "abstain", "abstain"],
        unaffiliatedCounts: ["answer1", "answer1", "answer1"],
      },
      [idMapping["question3"]]: {
        affiliatedCounts: ["forCount", "forCount", "forCount"],
        unaffiliatedCounts: ["answer2", "answer2", "answer2"],
      },
    }),
  },
  {
    id: "countess_request_2",
    house_id: "house_vorbretten",
    session_id: "session1",
    timestamp: new Date("Aug 21 2024 14:17:16"),
    question_requests: JSON.stringify({
      [idMapping["question1"]]: {
        affiliatedCounts: ["unaffiliated", "abstain", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "unaffiliated", "answer1"],
      },
      [idMapping["question2"]]: {
        affiliatedCounts: ["answer1", "answer1", "forCount"],
        unaffiliatedCounts: ["answer1", "answer1", "answer1"],
      },
      [idMapping["question3"]]: {
        affiliatedCounts: ["unaffiliated", "answer1", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
      },
    }),
  },
];

module.exports = {
  idMapping,
  persons,
  vorHouses,
  sessionQuestions,
  councilSessions,
  princesses,
  houseMembers,
  countessSessionRequests,
};
