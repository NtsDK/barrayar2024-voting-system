import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/common/search";
import { lusitana } from "@/app/ui/fonts";
import { DefaultSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

import { Metadata } from "next";
// import Table from "@/app/ui/vorHouses/table";
import { CreateVorHouse } from "@/app/ui/vorHouses/buttons";
import { fetchVorHousesPages } from "@/app/lib/vorHouseData";
import Table from "@/app/ui/sessions/table";
import { CreateSession } from "@/app/ui/sessions/buttons";

export const metadata: Metadata = {
  title: "Голосования",
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Голосования</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Найти голосование..." />
        <CreateSession />
      </div>
      <Suspense key={query + currentPage} fallback={<DefaultSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
