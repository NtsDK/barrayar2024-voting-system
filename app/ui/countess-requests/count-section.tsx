import { SessionQuestion } from "@/app/lib/definitions2";
import AffiliatedCountEditor from "./affiliated-count-editor";
import UnaffiliatedCountEditor from "./unaffiliated-count-editor";
import { CountessQuestionRequest } from "@/app/lib/voteDefinitions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function CountSection({
  countInfoList,
  setCountInfoList,
  questions,
}: {
  countInfoList: CountessQuestionRequest[];
  setCountInfoList: (infos: CountessQuestionRequest[]) => void;
  questions: SessionQuestion[];
}) {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id} className="mb-20">
          <div className="mb-6">
            <div className="text-xl mb-6">
              Вопрос {index + 1}: {question.question_text}
            </div>
            <div className="mb-6">Ответ 1: {question.answer1}</div>
            <div className="mb-6">Ответ 2: {question.answer2}</div>
          </div>

          <div className="mb-6">
            <div className="mb-4">Свои графы</div>
            <AffiliatedCountEditor
              affiliatedCounts={countInfoList[index].affiliatedCounts}
              setAffiliatedCounts={(affiliatedCounts) => {
                const copy = [...countInfoList];
                copy[index] = {
                  ...copy[index],
                  affiliatedCounts,
                };
                setCountInfoList(copy);
              }}
            />
          </div>
          <div>
            <div className="mb-4">
              Свободные графы{" "}
              <button
                type="button"
                className="rounded-md border p-2 bg-blue-600 text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => {
                  const copy = [...countInfoList];
                  copy[index] = {
                    ...copy[index],
                    unaffiliatedCounts: [
                      ...copy[index].unaffiliatedCounts,
                      "unaffiliated",
                    ],
                  };
                  setCountInfoList(copy);
                }}
              >
                <PlusIcon className="w-5" />{" "}
                <span className="sr-only">Добавить графа</span>
              </button>
            </div>
            <UnaffiliatedCountEditor
              unaffiliatedCounts={countInfoList[index].unaffiliatedCounts}
              setUnaffiliatedCounts={(unaffiliatedCounts) => {
                const copy = [...countInfoList];
                copy[index] = {
                  ...copy[index],
                  unaffiliatedCounts,
                };
                setCountInfoList(copy);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
