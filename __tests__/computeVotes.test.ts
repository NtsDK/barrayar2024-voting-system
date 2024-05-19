import computeVotes, { VoteComputeResult } from "@/app/lib/computeVotes";
import { CountsVoteLog, Vote } from "@/app/ui/questions/vorHouseList";

type VorHouse =
  | "house_vorbarra"
  | "house_vorbretten"
  | "house_vorvolinkin"
  | "house_vordarian"
  | "house_vorkosigan"
  | "house_vorlakial"
  | "house_vormuir"
  | "house_vorrobio"
  | "house_vorpatril"
  | "house_vorpinski"
  | "house_vorratier"
  | "house_vorsmit"
  | "house_vortala"
  | "house_vortein"
  | "house_vorhalas"
  | "house_vorhovic";

const vorHouseList: VorHouse[] = [
  "house_vorbarra",
  "house_vorbretten",
  "house_vorvolinkin",
  "house_vordarian",
  "house_vorkosigan",
  "house_vorlakial",
  "house_vormuir",
  "house_vorrobio",
  "house_vorpatril",
  "house_vorpinski",
  "house_vorratier",
  "house_vorsmit",
  "house_vortala",
  "house_vortein",
  "house_vorhalas",
  "house_vorhovic",
];

// const idMapping: Record<House, string> = {
//   house_vorbarra: "bc8518bc-b8a5-4b21-b74c-4045fe67a7ba",
//   house_vorbretten: "50f1246a-65aa-4f8a-a9b5-018dcff1d58c",
//   house_vorvolinkin: "586c3352-022c-462b-9ad0-91e37c221bbc",
//   house_vordarian: "7a0a29a2-d2b3-40c3-8ace-5d48186bf145",
//   house_vorkosigan: "f1e027e8-0079-4513-ba44-734775285625",
//   house_vorlakial: "c5fc12b8-0ccb-493b-ab26-0cd2111d42a2",
//   house_vormuir: "c9665462-ec4d-4e51-8807-0d16473776cd",
//   house_vorrobio: "c1551982-2ada-4243-917b-a545b5d13f90",
//   house_vorpatril: "69c274da-e0b0-490b-b633-a4ffd4d8b636",
//   house_vorpinski: "24bf5326-edf9-42f9-84ee-83c3f604be90",
//   house_vorratier: "a071052f-02df-4866-9e13-b485ce5100b5",
//   house_vorsmit: "c0125cc4-d61c-41a2-a3d7-abd6a2243a4f",
//   house_vortala: "7bd647d1-b52d-43cd-97f1-ee2498b009de",
//   house_vortein: "b1174bc7-499e-4f1a-ae19-8ce2771b0525",
//   house_vorhalas: "ad63730a-7d42-4e81-af9d-e8dafe066916",
//   house_vorhovic: "bef65095-2944-4e7c-b6ba-10fed5259a00",
// };

// type VorHouse = {
//   id: House;
//   familyName: string;
// };

// const vorHouses: VorHouse[] = [
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

function makeCountsVoteLog(
  partialLog?: { vote: Vote; familyName: string }[]
): CountsVoteLog {
  const countsVoteLog = vorHouseList.reduce((acc: CountsVoteLog, vorHouse) => {
    acc[vorHouse] = voteRecord(vorHouse, "notFilled");
    return acc;
  }, {});

  if (partialLog) {
    const tmp = partialLog.reduce((acc: CountsVoteLog, el) => {
      acc[el.familyName] = {
        familyName: el.familyName,
        vote: el.vote,
      };
      return acc;
    }, {});
    return { ...countsVoteLog, ...tmp };
  }

  return countsVoteLog;
}

describe("computeVotes", () => {
  it("Нет голосов графов - не все голоса заполнены", () => {
    const res = computeVotes(makeCountsVoteLog(), []);
    expect(res).toBe("notAllCountVotes" satisfies VoteComputeResult);
  });
  it("Все голоса за ответ 1 - выбран ответ 1", () => {
    const res = computeVotes(
      makeCountsVoteLog(vorHouseList.map((el) => voteRecord(el, "answer1"))),
      []
    );
    expect(res).toBe("answer1" satisfies VoteComputeResult);
  });
  it("Все голоса за ответ 2 - выбран ответ 2", () => {
    const res = computeVotes(
      makeCountsVoteLog(vorHouseList.map((el) => voteRecord(el, "answer2"))),
      []
    );
    expect(res).toBe("answer2" satisfies VoteComputeResult);
  });
  it("Голоса за ответ 1 и 2 поровну - выбран ответ 1", () => {
    const res = computeVotes(
      makeCountsVoteLog(
        vorHouseList.map((el, index) =>
          voteRecord(el, index % 2 ? "answer1" : "answer2")
        )
      ),
      []
    );
    expect(res).toBe("draw" satisfies VoteComputeResult);
  });

  it("2/3 за ответ 1 и 1/3 за 2 - выбран ответ 1", () => {
    const res = computeVotes(
      makeCountsVoteLog(
        vorHouseList.map((el, index) =>
          voteRecord(el, index % 3 ? "answer1" : "answer2")
        )
      ),
      []
    );
    expect(res).toBe("answer1" satisfies VoteComputeResult);
  });

  it("Все отсутствуют, 1 за ответ 2 - выбран ответ 2", () => {
    const res = computeVotes(
      makeCountsVoteLog(
        vorHouseList.map((el, index) =>
          voteRecord(el, index === 0 ? "answer2" : "absent")
        )
      ),
      []
    );
    expect(res).toBe("answer2" satisfies VoteComputeResult);
  });
});

function voteRecord(house: VorHouse, vote: Vote) {
  return {
    familyName: house,
    vote,
  };
}
