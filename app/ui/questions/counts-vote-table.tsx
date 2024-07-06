import { VorHousesTable } from "@/app/lib/definitions2";
import CheckButton from "../common/check-button";
import { voteList } from "./vorHouseList";
import { CountsVoteLog } from "@/app/lib/voteDefinitions";

type CountsVoteTableProps = {
  countsVoteLog: CountsVoteLog;
  setCountsVoteLog: (countsVoteLog: CountsVoteLog) => void;
  vorHouses: VorHousesTable[];
  votingEnabled: boolean;
};

export default function CountsVoteTable({
  vorHouses,
  countsVoteLog,
  setCountsVoteLog,
  votingEnabled,
}: CountsVoteTableProps) {
  return (
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Фамилия
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Ответ 1
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Ответ 2
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Воздержался
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Отсутствует
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {vorHouses?.map((vorHouse) => (
          <tr
            key={vorHouse.id}
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            <td className="whitespace-nowrap py-3 pl-6 pr-3">{vorHouse.family_name}</td>
            {voteList.map((vote) => (
              <td key={`${vorHouse.id}_${vote}`} className="whitespace-nowrap px-3 py-3">
                <CheckButton
                  checked={countsVoteLog[vorHouse.id].vote === vote}
                  votingEnabled={votingEnabled}
                  onClick={() =>
                    setCountsVoteLog({
                      ...countsVoteLog,
                      [vorHouse.id]: {
                        vote,
                        familyName: vorHouse.family_name,
                      },
                    })
                  }
                />
              </td>
            ))}
          </tr>
        ))}
        <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
          <td className="whitespace-nowrap py-3 pl-6 pr-3">
            Всего {vorHouses.length - Object.values(countsVoteLog).filter((el) => el.vote === "notFilled").length}
          </td>
          {voteList.map((vote) => (
            <td key={vote} className="whitespace-nowrap px-3 py-3">
              {Object.values(countsVoteLog).filter((el) => el.vote === vote).length}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
