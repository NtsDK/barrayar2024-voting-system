import { VorHousesTable } from "@/app/lib/definitions2";
import CheckButton from "../common/check-button";
import { voteList } from "./vorHouseList";
import { CountsVoteLog } from "@/app/lib/voteDefinitions";

import clsx from "clsx";
import { VOTE_I18N } from "@/constants";

type CountsVoteTableProps = {
  countsVoteLog: CountsVoteLog;
  setCountsVoteLog: (countsVoteLog: CountsVoteLog) => void;
  vorHouses: VorHousesTable[];
  votingEnabled: boolean;
  className?: string;
};

export default function CountsVoteTable({
  vorHouses,
  countsVoteLog,
  setCountsVoteLog,
  votingEnabled,
  className,
}: CountsVoteTableProps) {
  return (
    <table className={clsx("hidden min-w-full text-gray-900 md:table", className)}>
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Фамилия
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            {VOTE_I18N.answer1}
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            {VOTE_I18N.answer2}
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            {VOTE_I18N.abstain}
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            {VOTE_I18N.absent}
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
                  disabled={!votingEnabled}
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
