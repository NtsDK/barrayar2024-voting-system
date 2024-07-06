import { CountVoteStatus, VoteSummaryRow } from "@/app/lib/voteDefinitions";
import { COUNT_VOTE_STATUS_I18N } from "@/constants";

interface VotingSummaryProps {
  summary: VoteSummaryRow[];
  className?: string;
}

export function VotingSummary({ summary, className }: VotingSummaryProps) {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="w-32 text-right">Ответ 1</th>
            <th className="w-32 text-right">Ответ 2</th>
            <th className="w-32 text-right">Воздержался</th>
            <th className="w-32 text-left pl-8">Итог</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((row, index) => (
            <tr key={row.name + index}>
              <td>{row.name}</td>
              <td className="text-right">{row.voteIndex.answer1}</td>
              <td className="text-right">{row.voteIndex.answer2}</td>
              <td className="text-right">{row.voteIndex.abstain}</td>
              <td className="text-left pl-8">{row.voteStatus ? COUNT_VOTE_STATUS_I18N[row.voteStatus] : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
