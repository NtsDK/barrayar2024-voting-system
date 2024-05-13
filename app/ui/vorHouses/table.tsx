import { fetchFilteredVorHouses } from "@/app/lib/vorHouseData";
import {
  DeleteVorHouse,
  UpdateVorHouse,
  UpdateVorHouseMembers,
} from "./buttons";
import { useState } from "react";
import SocialCapitalForm from "./social-capital-form";

export default async function VorHousesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const vorHouses = await fetchFilteredVorHouses(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
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
                <th scope="col" className="px-3 py-5 font-medium">
                  Соцкап
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
                  <td className="whitespace-nowrap px-3 py-3 flex">
                    <div className="w-12">{vorHouse.social_capital}</div>
                    <SocialCapitalForm
                      id={vorHouse.id}
                      baseNumber={vorHouse.social_capital}
                    />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateVorHouseMembers id={vorHouse.id} />
                      <UpdateVorHouse id={vorHouse.id} />
                      {/* <DeleteVorHouse id={vorHouse.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
