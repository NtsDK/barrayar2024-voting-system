const { v4: uuidv4 } = require("uuid");

// for(let i = 0; i< 10; ++i) {
//   console.log(uuidv4())
// }

// https://www.uuidgenerator.net/version4

const idMapping = (function () {
  const index = {};

  return (key) => {
    if (!index[key]) {
      index[key] = uuidv4();
    }
    return index[key];
  };
})();

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const persons = [
  // Форбарра
  ["vorbarra_urii_emperor", "Юрий Форбарра", "император Барраяра"],
  ["vorbarra_margareta_princess", "Маргарета Форбарра", "принцесса, сестра Юрия Форбарры"],
  ["vorbarra_ksav_prince", "Ксав Форбарра", "принц, сын Дорки Справедливого"],
  ["vorbarra_beatrice_princess", "Беатрис Форбарра", "принцесса, жена Ксава Форбарра, бетанка"],
  ["vorbarra_edward", "Эдвард Форбарра", "лорд, сын Ксава Форбарра"],
  ["vorbarra_tyler_security_service", "Тайлер Форбарра", "фор, СБ"],
  ["vorbarra_kostas_security_service", "Костас Форбарра", "фор, СБ"],
  ["vorbarra_lorelin", "Лорелин Форгир", "родственница императора Юрия Форбарры"],
  // Форбреттен
  ["vorbretten_alan_count", "Алан Форбреттен", "граф"],
  ["vorbretten_eliza_countess", "Элиза Форбреттен", "графиня, жена Алана Форбреттена"],
  ["vorbretten_filipp", "Филипп Форбреттен", "старший сын графа Форбреттена, наследник"],
  ["vorbretten_rene_iva", "Рене Форбреттен", "младший сын графа Форбреттена, ИВА"],
  ["vorbretten_estella", "Эстелла Форбреттен", "дочь графа Форбреттена"],
  // Форволынкин
  ["vorvolinkin_arsenii_count", "Арсений Форволынкин", "граф"],
  ["vorvolinkin_esenia_countess", "Есения Форволынкина", "графиня, жена графа Форволынкина"],
  ["vorvolinkin_olga", "Ольга Форволынкина", "сестра графа Форволынкина"],
  ["vorvolinkin_filat", "Филат Форволынкин", "лорд, брат графа Форволынкина"],
  // Фордариан
  ["vordarian_isaak_count", "Айзек Фордариан", "граф"],
  ["vordarian_ustinia_countess", "Юстиния Фордариан", "графиня, жена графа Фордариана, урожд. Форбарра"],
  ["vordarian_luis", "Луи Фордариан", "фор, генерал генштаба"],
  // Форкосиган
  ["vorkosigan_peter_count", "Петер Форкосиган", "граф"],
  ["vorkosigan_olivia_countess", "Оливия Форкосиган", "графиня, жена Форкосигана, урожд. Форбарра"],
  ["vorkosigan_vadim_iva", "Вадим Форкосиган", "старший сын графа Форкосигана, наследник, ИВА"],
  ["vorkosigan_rebecca", "Ребекка Форкосиган", "дочь графа Форкосигана"],
  // Формюир
  ["vormuir_andre_count", "Андрэ Формюир", "граф"],
  ["vormuir_diana_countess", "Диана Формюир", "вдовствующая графиня Формюир. урожд. Форлакиал"],
  ["vormuir_elai", "Элай Формюир", "младший брат графа Формюира, наследник, Политвоспитание"],
  ["vormuir_brian_iva", "Бриан Формюир", "младший брат графа Формюира, ИВА"],
  ["vormuir_kermit_iva", "Кермит Форлакиал", "воспитанник графа Формюира, ИВА"],
  // Форобио
  ["vorrobio_victor_count", "Виктор Форобио", "граф"],
  ["vorrobio_elen_countess", "Элен Форобио", "графиня, жена графа Форобио"],
  ["vorrobio_raul_iva", "Рауль Форобио", "сын графа Форобио, наследник, ИВА"],
  ["vorrobio_gabril", "Габрил Форобио", "младший брат графа Форобио, Политвоспитание"],
  ["vorrobio_amelia", "Амелия Форобио", "дочь графа Форобио"],
  // Форпатрил
  ["vorpatril_falco_count", "Фалько Форпатрил", "граф"],
  ["vorpatril_chloe_countess", "Хлоя Форпатрил", "графиня, жена графа Форпатрила"],
  ["vorpatril_frederik_iva", "Фредерик Форпатрил", "старший сын графа Форпатрила, наследник, ИВА"],
  ["vorpatril_george_iva", "Джордж Форпатрил", "младший сын графа Форпатрила, ИВА"],
  ["vorpatril_ivan", "Айвен Форпатрил", "родственник графа Форпатрила по боковой линии"],
  ["vorpatril_sonya", "Соня Форпатрил", "жена Айвена Форпатрила, урожд. Форбарра"],
  // Форпински
  ["vorpinski_grigorii_count", "Григорий Форпински", "граф"],
  ["vorpinski_sofia_countess", "София Форпински", "графиня, жена графа Форпински"],
  ["vorpinski_vladislav_iva", "Владислав Форпински", "сын графа Форпински от первого брака, наследник, ИВА"],
  ["vorpinski_stanislav", "Станислав Форпински", "брат графа Форпински"],
  // Форратьер
  ["vorratier_michael_count", "Мишель Форратьер", "граф"],
  ["vorratier_irin_countess", "Айрин Форратьер", "дочь графа Форратьера"],
  ["vorratier_pier", "Пьер Форратьер", "старший сын графа Форратьера, наследник"],
  ["vorratier_dono", "Доно Форратьер", "младший сын графа Форратьера"],
  ["vorratier_michael_2_iva", "Мишель Форратьер", "внук графа Форратьера, ИВА"],
  ["vorratier_selin", "Селин Форратьер", "дочь Доно Форратьера"],
  // Форсмит
  ["vorsmit_james_count", "Джеймс Форсмит", "граф"],
  ["vorsmit_eleonora_countess", "Элеонора Форсмит", "графиня, жена Форсмита"],
  ["vorsmit_dar", "Дар Форсмит", "старший сын графа Форсмита, наследник"],
  ["vorsmit_deired_iva", "Дейред Форсмит", "младший сын графа Форсмита, ИВА"],
  // Фортала
  ["vortala_ervin_count", "Эрвин Фортала", "граф"],
  ["vortala_victoria_countess", "Виктория Форлакиал", "вдовствующая графиня Фортала, сестра графа"],
  ["vortala_odri", "Одри Фортала", "старшая дочь графа Фортала"],
  ["vortala_ekaterina", "Екатерина Фортала", "средняя дочь графа Фортала"],
  ["vortala_pavla", "Павла Фортала", "младшая дочь графа Фортала"],
  ["vortala_evelin", "Эвелин Форлакиал", "воспитанница графини Фортала"],
  // Фортейн
  ["vortein_nataniel_count", "Натаниэль Фортейн", "граф"],
  ["vortein_ember_countess", "Эмбер Фортейн", "графиня Фортейн"],
  // Форхалас
  ["vorhalas_ivon_count", "Ивон Форхалас", "граф"],
  ["vorhalas_alice_countess", "Элис Форхалас", "графиня Форхалас"],
  ["vorhalas_ralf_iva", "Ральф Форхалас", "младший сын графа Форхаласа от первого брака, ИВА"],
  // Форховиц
  ["vorhowitz_alex_count", "Алекс Форховиц", "граф"],
  ["vorhowitz_daria_countess", "Дарья Форховиц", "графиня Форховиц"],
  ["vorhowitz_andrei", "Андрей Форховиц", "племянник графа Форховица, генерал генштаба"],
  // семьи форов
  // Форгорофф
  ["vorgoroff_lars", "Ларс Форгорофф", "начальник ИВА"],
  ["vorgoroff_kristina", "Кристина Форкерес", "сестра начальника ИВА, вдова"],
  ["vorgoroff_andreas_iva", "Андреас Форгорофф", "сын начальника ИВА, ИВА"],
  ["vorgoroff_emil", "Эмиль Форгорофф", "брат начальника ИВА, начальник мин. политвоспитания"],
  // Форкрафт
  ["vorcraft_oberon", "Оберон Форкрафт", "начальник генштаба"],
  ["vorcraft_antoni_iva", "Энтони Форкрафт", "сын начальника генштаба, ИВА"],
  // несемейные
  ["vorlesner_james", "Джеймс Форлеснер", "фор, лорд-хранитель совета графов"],
  ["vortalon_martin", "Мартин Форталон", "фор, генштаб, брат графини Фортейн"],
  ["vorkeres_gustav", "Густав Форкерес", "фор, голос графов Форлакиалов"],
  ["vornei_kristof", "Кристоф Форней", "фор, генерал генштаба"],
  ["billiot_curt", "Курт Биллиот", "не фор, служит в Генштабе"],
  ["illeria_john", "Джон Иллерия", "не фор, СБ"],
  ["stoltides_dimos", "Димос Столтидес", "не фор. СБ"],
  ["grishnov_dmitrii", "Дмитрий Гришнов", "не фор,министерство политвоспитания"],
  ["ungari_nicolai", "Николай Унгари", "не фор, сержант, ИВА"],
  ["jezek_heins", "Хейнс Джезек", "не фор, сержант ИВА"],
];

const vorHouses = [
  {
    id: "house_vorbarra",
    familyName: "Форбарра",
    count_id: "vorbarra_urii_emperor",
    socialCapital: 100,
  },
  {
    id: "house_vorbretten",
    familyName: "Форбреттен",
    count_id: "vorbretten_alan_count",
    countess_id: "vorbretten_eliza_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorvolinkin",
    familyName: "Форволынкин",
    count_id: "vorvolinkin_arsenii_count",
    countess_id: "vorvolinkin_esenia_countess",
    socialCapital: 100,
  },
  {
    id: "house_vordarian",
    familyName: "Фордариан",
    count_id: "vordarian_isaak_count",
    countess_id: "vordarian_ustinia_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorkosigan",
    familyName: "Форкосиган",
    count_id: "vorkosigan_peter_count",
    countess_id: "vorkosigan_olivia_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorlakial",
    familyName: "Форлакиал",
    countess_id: "vortala_victoria_countess",
    socialCapital: 100,
  },
  {
    id: "house_vormuir",
    familyName: "Формюир",
    count_id: "vormuir_andre_count",
    countess_id: "vormuir_diana_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorrobio",
    familyName: "Форобио",
    count_id: "vorrobio_victor_count",
    countess_id: "vorrobio_elen_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorpatril",
    familyName: "Форпатрил",
    count_id: "vorpatril_falco_count",
    countess_id: "vorpatril_chloe_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorpinski",
    familyName: "Форпински",
    count_id: "vorpinski_grigorii_count",
    countess_id: "vorpinski_sofia_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorratier",
    familyName: "Форратьер",
    count_id: "vorratier_michael_count",
    countess_id: "vorratier_irin_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorsmit",
    familyName: "Форсмит",
    count_id: "vorsmit_james_count",
    countess_id: "vorsmit_eleonora_countess",
    socialCapital: 100,
  },
  {
    id: "house_vortala",
    familyName: "Фортала",
    count_id: "vortala_ervin_count",
    countess_id: "vortala_victoria_countess",
    socialCapital: 100,
  },
  {
    id: "house_vortein",
    familyName: "Фортейн",
    count_id: "vortein_nataniel_count",
    countess_id: "vortein_ember_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorhalas",
    familyName: "Форхалас",
    count_id: "vorhalas_ivon_count",
    countess_id: "vorhalas_alice_countess",
    socialCapital: 100,
  },
  {
    id: "house_vorhowitz",
    familyName: "Форховиц",
    count_id: "vorhowitz_alex_count",
    countess_id: "vorhowitz_daria_countess",
    socialCapital: 100,
  },
];

const councilSessions = [
  {
    id: "session1",
    title: "Первое заседание",
    dateTime: "22 августа 12:00",
    status: "countessVoting",
  },
  {
    id: "session2",
    title: "Второе заседание",
    dateTime: "23 августа 14:00",
    status: "finished",
  },
];

const sessionQuestions = [
  {
    id: "question1",
    session_id: "session1",
    type: "player",
    questionText: "1. Должен ли любимый конь императора стать графом?",
    answer1: "Да, с присвоением титула и фамилии граф Форовсов",
    answer1_advocate_id: "vorbarra_urii_emperor",
    answer2: "Да, с присвоением титула и фамилии графиня Форскакунаева",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "{}",
  },
  {
    id: "question2",
    session_id: "session1",
    type: "player",
    questionText: "2. Разрешить ли использование пентотала на Барраяре?",
    answer1: "Да, разрешить",
    answer1_advocate_id: null,
    answer2: "Нет, не разрешить",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "{}",
  },
  {
    id: "question3",
    session_id: "session1",
    type: "player",
    questionText: "3. Как назвать любимую собаку Юры?",
    answer1: "Тузик",
    answer1_advocate_id: null,
    answer2: "Бобик",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "{}",
  },
  {
    id: "question4",
    session_id: "session2",
    type: "player",
    questionText: "ЗВ или Стар Трек?",
    answer1: "ЗВ",
    answer1_advocate_id: null,
    answer2: "Стар Трек",
    answer2_advocate_id: null,
    status: "raised",
    voteLog: "{}",
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
    person_id: "vorbretten_rene_iva",
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
      [idMapping("question1")]: {
        affiliatedCounts: ["unaffiliated", "abstain", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "answer1", "answer2"],
      },
      [idMapping("question2")]: {
        affiliatedCounts: ["abstain", "abstain", "abstain"],
        unaffiliatedCounts: ["answer1", "answer1", "answer1"],
      },
      [idMapping("question3")]: {
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
      [idMapping("question1")]: {
        affiliatedCounts: ["unaffiliated", "abstain", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "answer2", "answer1"],
      },
      [idMapping("question2")]: {
        affiliatedCounts: ["answer1", "answer1", "forCount"],
        unaffiliatedCounts: ["answer1", "answer1", "answer1"],
      },
      [idMapping("question3")]: {
        affiliatedCounts: ["unaffiliated", "answer1", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "unaffiliated", "unaffiliated"],
      },
    }),
  },
  {
    id: "countess_request_3",
    house_id: "house_vorratier",
    session_id: "session2",
    timestamp: new Date("Aug 21 2024 14:17:16"),
    question_requests: JSON.stringify({
      [idMapping("question4")]: {
        affiliatedCounts: ["unaffiliated", "abstain", "forCount"],
        unaffiliatedCounts: ["unaffiliated", "answer2", "answer1"],
      },
    }),
  },
];

const socCapCosts = {
  id: "socCapCosts",
  settings: JSON.stringify({
    affiliated_unaffiliated: 0,
    affiliated_abstain: 5,
    affiliated_forCount: 10,
    affiliated_againstCount: 10,
    affiliated_answer1: 20,
    affiliated_answer2: 20,
    unaffiliated_unaffiliated: 0,
    unaffiliated_forCount: 20,
    unaffiliated_againstCount: 20,
    unaffiliated_answer1: 40,
    unaffiliated_answer2: 40,
  }),
};

module.exports = {
  idMapping,
  persons,
  vorHouses,
  sessionQuestions,
  councilSessions,
  princesses,
  houseMembers,
  countessSessionRequests,
  socCapCosts,
  users,
};
