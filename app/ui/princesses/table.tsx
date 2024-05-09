import { fetchPrincesses } from "@/app/lib/princessData";
import SocialCapitalForm from "./social-capital-form";

export default async function PrincessesTable() {
  const princesses = await fetchPrincesses();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Принцессы
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Позитивный соц.кап.
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Негативный соц.кап.
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {princesses?.map((princess) => (
                <tr
                  key={princess.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{princess.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex">
                      <div className="w-12">
                        {princess.positive_social_capital}
                      </div>
                      <SocialCapitalForm
                        id={princess.id}
                        baseNumber={princess.positive_social_capital}
                        type="positive"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex">
                      <div className="w-12">
                        {princess.negative_social_capital}
                      </div>

                      <SocialCapitalForm
                        id={princess.id}
                        baseNumber={princess.negative_social_capital}
                        type="negative"
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3"></div>
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
