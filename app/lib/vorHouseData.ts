import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { VorHouse, VorHousesTable } from "./definitions2";

// столько семей не будет, фактически это убирает пагинацию
const ITEMS_PER_PAGE = 100;

export async function fetchFilteredVorHouses(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const vorHouses = await sql<VorHousesTable[]>`
      SELECT
        vor_houses.id,
        vor_houses.family_name,
        vor_houses.count_id,
        vor_houses.countess_id,
        vor_houses.social_capital,
        count.name AS count_name,
        countess.name AS countess_name
      FROM vor_houses
        LEFT JOIN persons AS count ON vor_houses.count_id = count.id
        LEFT JOIN persons AS countess ON vor_houses.countess_id = countess.id
      WHERE
        vor_houses.family_name ILIKE ${`%${query}%`} OR
        count.name ILIKE ${`%${query}%`} OR
        countess.name ILIKE ${`%${query}%`}
      ORDER BY 
        vor_houses.family_name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // console.log("vorHouses", vorHouses);

    return vorHouses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch vorHouses.");
  }
}

export async function fetchVorHouses() {
  return fetchFilteredVorHouses("", 1);
}

export async function fetchVorHousesPages(query: string) {
  noStore();
  try {
    const count = await sql`
    SELECT 
      COUNT(*)
    FROM vor_houses
      LEFT JOIN persons AS count ON vor_houses.count_id = count.id
      LEFT JOIN persons AS countess ON vor_houses.countess_id = countess.id
    WHERE
      vor_houses.family_name ILIKE ${`%${query}%`} OR
      count.name ILIKE ${`%${query}%`} OR
      countess.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of vorHouses.");
  }
}

export async function fetchVorHouseById(id: string) {
  noStore();
  try {
    const data = await sql<VorHouse[]>`
      SELECT
        vor_houses.id,
        vor_houses.family_name,
        vor_houses.count_id,
        vor_houses.countess_id,
        vor_houses.social_capital
      FROM vor_houses
      WHERE vor_houses.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
