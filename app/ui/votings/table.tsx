import { fetchFilteredCouncilVotings } from "@/app/lib/votingData";
import { DeleteVoting, UpdateVoting } from "./buttons";
import { COUNCIL_VOTING_STATUS_I18N } from "@/constants";
import { Card } from "./card";
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
              <h2>
                {voting.date_time} {COUNCIL_VOTING_STATUS_I18N[voting.status]}
                <div className="flex justify-end gap-3">
                  <CreateQuestion id={voting.id} />
                  <UpdateVoting id={voting.id} />
                  <DeleteVoting id={voting.id} />
                </div>
              </h2>
              <div className="ml-8">
                {voting.questions.map((question) => (
                  <Card key={question.id} question={question} />
                ))}
              </div>
            </div>
          ))}
          {/* <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Фамилия
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Граф
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Графиня
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {vorHouses?.map((vorHouse) => (
                <tr
                  key={vorHouse.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{vorHouse.family_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vorHouse.count_name || ""}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {vorHouse.countess_name || ""}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateVorHouse id={vorHouse.id} />
                      <DeleteVorHouse id={vorHouse.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
