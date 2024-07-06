import { SessionQuestionStatus } from "@/app/lib/definitions2";
import { SocCapitalExpenseRecord } from "@/app/lib/voteDefinitions";
import { SESSION_QUESTION_STATUS_I18N } from "@/constants";

interface ChangesToApplyProps {
  questionStatus: SessionQuestionStatus;
  socCapitalExpenses: SocCapitalExpenseRecord[];
  className?: string;
}

export function ChangesToApply({ questionStatus, socCapitalExpenses, className }: ChangesToApplyProps) {
  return (
    <div className={className}>
      <div className="mb-4">Новый статус вопроса: {SESSION_QUESTION_STATUS_I18N[questionStatus]}</div>
      <div className="mb-2 font-semibold">Расходы соц капитала</div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="w-40 text-right">Свои графы</th>
            <th className="w-40 text-right">Свободные графы</th>
            <th className="w-24 text-right">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {socCapitalExpenses.map((row) => (
            <tr>
              <td>{row.house_name}</td>
              <td className="text-right">{row.affiliatedCountsExpenses}</td>
              <td className="text-right">{row.unaffiliatedCountsExpenses}</td>
              <td className="text-right">{row.totalCountsExpenses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
