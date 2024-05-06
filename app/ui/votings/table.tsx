import { fetchFilteredCouncilVotings } from "@/app/lib/votingData";
import { DeleteVoting, UpdateVoting } from "./buttons";
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { Card } from "../questions/card";
import { CreateQuestion } from "../questions/buttons";

export default async function VorHousesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const votings = await fetchFilteredCouncilVotings(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {votings?.map((voting) => (
            <div key={voting.id} className="mb-10">
              <div>
                <h2>{voting.title}</h2>
                {voting.date_time} {COUNCIL_VOTING_STATUS_I18N[voting.status]}
                <div className="flex justify-end gap-3">
                  <CreateQuestion id={voting.id} />
                  <UpdateVoting id={voting.id} />
                  <DeleteVoting id={voting.id} />
                </div>
              </div>
              <div className="ml-8">
                {voting.questions.map((question) => (
                  <Card key={question.id} question={question} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
