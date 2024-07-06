import { PrecomputeVotesResult } from "@/app/lib/voteDefinitions";
import { CountVoteLogCard } from "./count-vote-log-card";

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
  return (
    <div className={className}>
      <table>
        <tbody>
          {arr.map(([label, value]) => (
            <tr>
              <td className="pr-4">{label}</td>
              <td className="text-right">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-8">
        <div className="mb-4 font-bold">Заявки на своих графов</div>
        {affiliatedCountsVoteLog.map((item) => (
          <CountVoteLogCard item={item} className="pb-6" />
        ))}
      </div>
      <div className="p-8">
        <div className="mb-4 font-bold">Заявки на свободных графов</div>
        {unaffiliatedCountsVoteLog.map((item) => (
          <CountVoteLogCard item={item} className="pb-6" />
        ))}
      </div>
    </div>
  );
}
