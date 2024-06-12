import Image from "next/image";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredPersons } from "@/app/lib/personData";
import { fetchCountessRequests } from "@/app/lib/countessRequestData";
import { DeleteCountessRequest, UpdateCountessRequest } from "./buttons";
// import { DeletePerson, UpdatePerson } from "./buttons";

export default async function CountessRequestsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const countessRequests = await fetchCountessRequests();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {countessRequests.map((countessRequest) => (
            <div key={countessRequest.id} className="flex">
              <div className="flex-auto">
                <div>{countessRequest.house_name}</div>
                <div>{countessRequest.session_id}</div>
                <div>{countessRequest.timestamp.toLocaleString()}</div>
                <div>{JSON.stringify(countessRequest.question_requests)}</div>
              </div>
              <div className="flex-grow-0 flex-shrink-0">
                <div className="flex justify-end gap-3">
                  <UpdateCountessRequest id={countessRequest.id} />
                  <DeleteCountessRequest id={countessRequest.id} />
                </div>
              </div>
            </div>
          ))}
          {/* <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Имя
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Комент
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {persons?.map((person) => (
                <tr
                  key={person.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{person.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {person.comment}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePerson id={person.id} />
                      <DeletePerson id={person.id} />
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
