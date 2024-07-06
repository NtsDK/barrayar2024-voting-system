import { UnaffiliatedCount, socCapitalValues } from "@/app/lib/voteDefinitions";
import CheckButton from "../common/check-button";
import { Dispatch, SetStateAction } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { COUNT_VOTE_REQUEST_I18N } from "@/constants";

interface UnaffiliatedCountEditorProps {
  unaffiliatedCounts: UnaffiliatedCount[];
  setUnaffiliatedCounts: (counts: UnaffiliatedCount[]) => void;
}

export default function UnaffiliatedCountEditor(props: UnaffiliatedCountEditorProps) {
  const { unaffiliatedCounts, setUnaffiliatedCounts } = props;
  function onUnaffiliatedChange(index: number, type: UnaffiliatedCount) {
    const copy = [...unaffiliatedCounts];
    copy[index] = type;
    setUnaffiliatedCounts(copy);
  }
  return (
    <table>
      <thead>
        <tr>
          <th className="p-2">#</th>
          <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.unaffiliated}</th>
          {/* <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.abstain}</th> */}
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.forCount}</th>
          <th className="p-2 w-32 border-r-2 border-gray-800">{COUNT_VOTE_REQUEST_I18N.againstCount}</th>
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.answer1}</th>
          <th className="p-2 w-32">{COUNT_VOTE_REQUEST_I18N.answer2}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td className="text-center border-r-2 border-gray-800">{socCapitalValues.unaffiliated_unaffiliated}ск</td>
          {/* <td className="text-center border-r-2 border-gray-800">5ск</td> */}
          <td className="text-center">{socCapitalValues.unaffiliated_forCount}ск</td>
          <td className="text-center border-r-2 border-gray-800">{socCapitalValues.unaffiliated_againstCount}ск</td>
          <td className="text-center">{socCapitalValues.unaffiliated_answer1}ск</td>
          <td className="text-center">{socCapitalValues.unaffiliated_answer2}ск</td>
        </tr>
        {unaffiliatedCounts.map((el, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td className="text-center border-r-2 border-gray-800">
              <CheckButton
                checked={el === "unaffiliated"}
                onClick={() => onUnaffiliatedChange(index, "unaffiliated")}
              />
            </td>
            {/* <td className="text-center border-r-2 border-gray-800">
              <CheckButton
                checked={el === "abstain"}
                onClick={() => onUnaffiliatedChange(index, "abstain")}
              />
            </td> */}
            <td className="text-center">
              <CheckButton checked={el === "forCount"} onClick={() => onUnaffiliatedChange(index, "forCount")} />
            </td>
            <td className="text-center border-r-2 border-gray-800">
              <CheckButton
                checked={el === "againstCount"}
                onClick={() => onUnaffiliatedChange(index, "againstCount")}
              />
            </td>
            <td className="text-center">
              <CheckButton checked={el === "answer1"} onClick={() => onUnaffiliatedChange(index, "answer1")} />
            </td>
            <td className="text-center">
              <CheckButton checked={el === "answer2"} onClick={() => onUnaffiliatedChange(index, "answer2")} />
            </td>
            <td>
              <button
                type="button"
                className="rounded-md border p-2 hover:bg-gray-100"
                onClick={() => {
                  setUnaffiliatedCounts(unaffiliatedCounts.filter((_, index2) => index2 !== index));
                }}
              >
                <span className="sr-only">Удалить</span>
                <TrashIcon className="w-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
