import { AffiliatedCount, socCapitalValues } from "@/app/lib/voteDefinitions";
import CheckButton from "../common/check-button";
import { Dispatch, SetStateAction } from "react";
import { COUNT_VOTE_REQUEST_I18N } from "@/constants";

interface AffiliatedCountEditorProps {
  affiliatedCounts: AffiliatedCount[];
  setAffiliatedCounts: (counts: AffiliatedCount[]) => void;
}

export default function AffiliatedCountEditor(props: AffiliatedCountEditorProps) {
  const { affiliatedCounts, setAffiliatedCounts } = props;
  function onAffiliatedChange(index: number, type: AffiliatedCount) {
    const copy = [...affiliatedCounts];
    copy[index] = type;
    setAffiliatedCounts(copy);
  }
  return (
    <table>
      <thead>
        <tr>
          <th className="p-2">#</th>
          <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.unaffiliated}</th>
          <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.abstain}</th>
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.forCount}</th>
          <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.againstCount}</th>
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.answer1}</th>
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.answer2}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td className="text-center border-r-2 border-gray-800">{socCapitalValues.affiliated_unaffiliated}ск</td>
          <td className="text-center border-r-2 border-gray-800">{socCapitalValues.affiliated_abstain}ск</td>
          <td className="text-center">{socCapitalValues.affiliated_forCount}ск</td>
          <td className="text-center border-r-2 border-gray-800">{socCapitalValues.affiliated_againstCount}ск</td>
          <td className="text-center">{socCapitalValues.affiliated_answer1}ск</td>
          <td className="text-center">{socCapitalValues.affiliated_answer2}ск</td>
        </tr>
        {affiliatedCounts.map((el, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td className="text-center border-r-2 border-gray-800">
              <CheckButton checked={el === "unaffiliated"} onClick={() => onAffiliatedChange(index, "unaffiliated")} />
            </td>
            <td className="text-center border-r-2 border-gray-800">
              <CheckButton checked={el === "abstain"} onClick={() => onAffiliatedChange(index, "abstain")} />
            </td>
            <td className="text-center">
              <CheckButton checked={el === "forCount"} onClick={() => onAffiliatedChange(index, "forCount")} />
            </td>
            <td className="text-center border-r-2 border-gray-800">
              <CheckButton checked={el === "againstCount"} onClick={() => onAffiliatedChange(index, "againstCount")} />
            </td>
            <td className="text-center">
              <CheckButton checked={el === "answer1"} onClick={() => onAffiliatedChange(index, "answer1")} />
            </td>
            <td className="text-center">
              <CheckButton checked={el === "answer2"} onClick={() => onAffiliatedChange(index, "answer2")} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
