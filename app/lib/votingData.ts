import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { CouncilVoting, VorHouse, VorHousesTable } from "./definitions2";

// const ITEMS_PER_PAGE = 15;

export async function fetchFilteredCouncilVotings(
  query: string,
  currentPage: number
) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const votings = await sql<CouncilVoting[]>`
      SELECT
        council_votings.id,
        council_votings.date_time,
        council_votings.status
      FROM council_votings
      ORDER BY 
        council_votings.date_time ASC
    `;

    // console.log("vorHouses", vorHouses);

    return votings;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch vorHouses.");
  }
}

export async function fetchVotingById(id: string) {
  noStore();
  try {
    const data = await sql<CouncilVoting[]>`
      SELECT
        council_votings.id,
        council_votings.date_time,
        council_votings.status
      FROM council_votings
      WHERE council_votings.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
