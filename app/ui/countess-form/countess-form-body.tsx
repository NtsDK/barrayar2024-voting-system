import { CouncilSessionsList } from "@/app/lib/definitions2";
import { SocCapCostsTable } from "@/app/lib/voteDefinitions";
import { COUNT_VOTE_REQUEST_I18N } from "@/constants";

interface CountessFormBodyProps {
  session: CouncilSessionsList;
  socCapCostsTable: SocCapCostsTable;
}

export function CountessFormBody({ session, socCapCostsTable }: CountessFormBodyProps) {
  const { settings } = socCapCostsTable;
  const ownCounts = [1, 2, 3];
  const freeCounts = [1, 2, 3];
  return (
    <div>
      <div>
        {session.questions.map((question, index) => (
          <div key={question.id} className="mb-12">
            <div className="mb-8">
              <div>
                Вопрос {index + 1}: {question.question_text}
              </div>
              <div>Ответ 1: {question.answer1}</div>
              <div>Ответ 2: {question.answer2}</div>
            </div>
            <div className="mb-8">
              <div className="font-bold">Свои графы</div>
              <table>
                <thead>
                  <tr>
                    <th className="px-4 border border-slate-300">№</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.unaffiliated}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.abstain}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.forCount}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.againstCount}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.answer1}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.answer2}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300"></td>
                    <td className="text-center border border-slate-300">{settings.affiliated_unaffiliated} ск</td>
                    <td className="text-center border border-slate-300">{settings.affiliated_abstain} ск</td>
                    <td className="text-center border border-slate-300">{settings.affiliated_forCount} ск</td>
                    <td className="text-center border border-slate-300">{settings.affiliated_againstCount} ск</td>
                    <td className="text-center border border-slate-300">{settings.affiliated_answer1} ск</td>
                    <td className="text-center border border-slate-300">{settings.affiliated_answer2} ск</td>
                  </tr>
                  {ownCounts.map((el, index) => (
                    <tr key={el + index}>
                      <td className="border border-slate-300 text-center">{index + 1}.</td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="font-bold">Свободные графы</div>
              <table>
                <thead>
                  <tr>
                    <th className="px-4 border border-slate-300">№</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.unaffiliated}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.forCount}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.againstCount}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.answer1}</th>
                    <th className="px-4 border border-slate-300">{COUNT_VOTE_REQUEST_I18N.answer2}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300"></td>
                    <td className="text-center border border-slate-300">{settings.unaffiliated_unaffiliated} ск</td>
                    <td className="text-center border border-slate-300">{settings.unaffiliated_forCount} ск</td>
                    <td className="text-center border border-slate-300">{settings.unaffiliated_againstCount} ск</td>
                    <td className="text-center border border-slate-300">{settings.unaffiliated_answer1} ск</td>
                    <td className="text-center border border-slate-300">{settings.unaffiliated_answer2} ск</td>
                  </tr>
                  {freeCounts.map((el, index) => (
                    <tr key={el + index}>
                      <td className="border border-slate-300 text-center">{index + 1}.</td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                      <td className="border border-slate-300"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      {/* <pre>{JSON.stringify(session, null, "  ")}</pre> */}
    </div>
  );
}
