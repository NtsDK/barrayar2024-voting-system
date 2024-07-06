import { PrecomputeVotesResult } from "@/app/lib/voteDefinitions";
import { CountVoteLogCard } from "./count-vote-log-card";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button } from "../common/button";
import { useState } from "react";
import clsx from "clsx";

export function DetailedVoteLog({
  precomputeState,
  className,
}: {
  precomputeState: PrecomputeVotesResult;
  className?: string;
}) {
  const {
    // голосование графинь
    countessQuestionRequestsCount,
    // голосование аффилированных графов
    affiliatedCountsVoteLog,
    // голосование неаффилированных графов
    unaffiliatedCountsByCountesses,
    unaffiliatedCountsByRequestsAbsense,
    totalUnaffiliatedCounts,
    restUnaffiliatedCounts,
    unaffiliatedCountsVoteLog,
  } = precomputeState;

  const arr: [string, number][] = [
    ["Количество заявок графинь", countessQuestionRequestsCount],
    ["Свободные графы из заявок графинь", unaffiliatedCountsByCountesses],
    ["Свободные графы по отсутствию заявок", unaffiliatedCountsByRequestsAbsense],
    ["Всего свободных графов", totalUnaffiliatedCounts],
    ["Свободные графы по итогу голосования", restUnaffiliatedCounts],
  ];

  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <div className={className}>
      <Button type="button" onClick={() => setDetailsOpen(!detailsOpen)}>
        Для рулежки{" "}
        <ChevronUpIcon
          className={clsx("w-6 float-right ml-4 transition ease-in-out duration-300", {
            "rotate-0": !detailsOpen,
            "rotate-180": detailsOpen,
          })}
        />
      </Button>
      <div
        className={clsx("overflow-hidden", {
          "h-0": !detailsOpen,
          "h-auto": detailsOpen,
        })}
      >
        <table>
          <tbody>
            {arr.map(([label, value]) => (
              <tr key={label}>
                <td className="pr-4">{label}</td>
                <td className="text-right">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-8">
          <div className="mb-4 font-bold">Заявки на своих графов</div>
          {affiliatedCountsVoteLog.map((item, index) => (
            <CountVoteLogCard
              key={item.house_name + item.timestamp.toLocaleString() + index}
              item={item}
              className="pb-6"
            />
          ))}
        </div>
        <div className="p-8">
          <div className="mb-4 font-bold">Заявки на свободных графов</div>
          {unaffiliatedCountsVoteLog.map((item, index) => (
            <CountVoteLogCard
              key={item.house_name + item.timestamp.toLocaleString() + index}
              item={item}
              className="pb-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
