type Vote = "notFilled" | "answer1" | "answer2" | "abstain" | "absent";

export const voteList: Vote[] = ["answer1", "answer2", "abstain", "absent"];

export const FAMILY_NAMES = [
  "Форбарра",
  "Форбреттен",
  "Форволынкин",
  "Фордариан",
  "Форкосиган",
  "Форлакиал",
  "Формюир",
  "Форобио",
  "Форпатрил",
  "Форпински",
  "Форратьер",
  "Форсмит",
  "Фортала",
  "Фортейн",
  "Форхалас",
  "Форховиц",
] as const;

export type VoteLog = Record<(typeof FAMILY_NAMES)[number], Vote>;

export const defaultVoteLog = FAMILY_NAMES.reduce((acc: VoteLog, name) => {
  acc[name] = "notFilled";
  return acc;
}, {} as VoteLog);

// type VorHouseName = {
//   id: string;
//   familyName: string;
// };

// export const vorHouseList: VorHouseName[] = [
//   {
//     id: "house_vorbarra",
//     familyName: "Форбарра",
//   },
//   {
//     id: "house_vorbretten",
//     familyName: "Форбреттен",
//   },
//   {
//     id: "house_vorvolinkin",
//     familyName: "Форволынкин",
//   },
//   {
//     id: "house_vordarian",
//     familyName: "Фордариан",
//   },
//   {
//     id: "house_vorkosigan",
//     familyName: "Форкосиган",
//   },
//   {
//     id: "house_vorlakial",
//     familyName: "Форлакиал",
//   },
//   {
//     id: "house_vormuir",
//     familyName: "Формюир",
//   },
//   {
//     id: "house_vorrobio",
//     familyName: "Форобио",
//   },
//   {
//     id: "house_vorpatril",
//     familyName: "Форпатрил",
//   },
//   {
//     id: "house_vorpinski",
//     familyName: "Форпински",
//   },
//   {
//     id: "house_vorratier",
//     familyName: "Форратьер",
//   },
//   {
//     id: "house_vorsmit",
//     familyName: "Форсмит",
//   },
//   {
//     id: "house_vortala",
//     familyName: "Фортала",
//   },
//   {
//     id: "house_vortein",
//     familyName: "Фортейн",
//   },
//   {
//     id: "house_vorhalas",
//     familyName: "Форхалас",
//   },
//   {
//     id: "house_vorhovic",
//     familyName: "Форховиц",
//   },
// ];
