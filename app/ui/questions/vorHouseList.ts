import { VorHousesTable } from "@/app/lib/definitions2";
import { Vote, VoteLog } from "@/app/lib/voteDefinitions";

export const voteList: Vote[] = ["answer1", "answer2", "abstain", "absent"];

export function getDefaultVoteLog(vorHouses: VorHousesTable[]): VoteLog {
  // const voteLog: VoteLog = { counts: {}, countesses: [] };
  const voteLog: VoteLog = { counts: {} };
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
