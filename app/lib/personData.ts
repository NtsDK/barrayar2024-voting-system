import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { Person } from "./definitions2";

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredPersons(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const persons = await sql<Person[]>`
      SELECT
        persons.id,
        persons.name,
        persons.comment
      FROM persons
      WHERE
        persons.name ILIKE ${`%${query}%`} OR
        persons.comment ILIKE ${`%${query}%`}
      ORDER BY persons.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return persons;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch persons.");
  }
}

export async function fetchPersonsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM persons
    WHERE
      persons.name ILIKE ${`%${query}%`} OR
      persons.comment ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of persons.");
  }
}

export async function fetchPersonById(id: string) {
  noStore();
  try {
    const data = await sql<Person[]>`
      SELECT
        persons.id,
        persons.name,
        persons.comment
      FROM persons
      WHERE persons.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
