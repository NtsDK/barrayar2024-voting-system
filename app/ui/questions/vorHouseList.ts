import { VorHousesTable } from "@/app/lib/definitions2";

export type Vote = "notFilled" | "answer1" | "answer2" | "abstain" | "absent";

export const voteList: Vote[] = ["answer1", "answer2", "abstain", "absent"];

export type VoteLog = {
  counts: Record<string, { vote: Vote; familyName: string }>;
  countesses: CountessRequest[];
  // TODO result
};

export type CountsVoteLog = VoteLog["counts"];
export type CountessesVoteLog = VoteLog["countesses"];

export type CountessRequest = {
  vorHouseId: string;
  familyName: string;
  affiliatedCounts: AffiliatedCount[];
  unaffiliatedCounts: UnaffiliatedCount[];
};

export type AffiliatedCount =
  | "unaffiliated" // свободный
  | "abstain" // воздержаться
  | "forCount" // за графа
  | "againstCount" // против графа
  | "answer1" // вариант1
  | "answer2"; // вариант2;

export type UnaffiliatedCount =
  | "unaffiliated" // свободный
  | "forCount" // за графа
  | "againstCount" // против графа
  | "answer1" // вариант1
  | "answer2"; // вариант2;

export function getDefaultVoteLog(vorHouses: VorHousesTable[]): VoteLog {
  const voteLog: VoteLog = { counts: {}, countesses: [] };
  vorHouses.forEach((el) => {
    voteLog.counts[el.id] = {
      vote: "notFilled",
      familyName: el.family_name,
    };
  });

  return voteLog;
}

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
