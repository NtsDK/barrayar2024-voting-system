import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import { lusitana } from "@/app/ui/fonts";
import { DefaultSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

import { Metadata } from "next";
import Table from "@/app/ui/vorHouses/table";
import { CreateVorHouse } from "@/app/ui/vorHouses/buttons";
import { fetchVorHousesPages } from "@/app/lib/vorHouseData";

export const metadata: Metadata = {
  title: "Фор семьи",
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

  const totalPages = await fetchVorHousesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Фор семьи</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Найти фор семью..." />
        <CreateVorHouse />
      </div>
      <Suspense key={query + currentPage} fallback={<DefaultSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
