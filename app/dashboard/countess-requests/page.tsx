import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/common/search";
import { lusitana } from "@/app/ui/fonts";
import { DefaultSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

import { Metadata } from "next";
import Table from "@/app/ui/countess-requests/table";
import { fetchPersonsPages } from "@/app/lib/personData";
import { CreatePerson } from "@/app/ui/persons/buttons";
import { CreateCountessRequest } from "@/app/ui/countess-requests/buttons";
import { fetchCountessRequestSessions } from "@/app/lib/sessionData";

export const metadata: Metadata = {
  title: "Заявки графинь",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchPersonsPages(query);
  const councilSessions = await fetchCountessRequestSessions();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Заявки графинь</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Найти персонажа..." /> */}

        {councilSessions.length === 0 ? <span>Нет открытых голосований графинь</span> : <CreateCountessRequest />}
      </div>
      <Suspense key={query + currentPage} fallback={<DefaultSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
