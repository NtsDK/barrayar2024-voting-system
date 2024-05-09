import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/common/search";
import { lusitana } from "@/app/ui/fonts";
import { DefaultSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

import { Metadata } from "next";
import Table from "@/app/ui/princesses/table";
import { fetchPersonsPages } from "@/app/lib/personData";
import { CreatePerson } from "@/app/ui/persons/buttons";

export const metadata: Metadata = {
  title: "Принцессы",
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Принцессы</h1>
      </div>
      <Suspense key={query} fallback={<DefaultSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
