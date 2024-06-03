import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import {
  VorHouse,
  VorHousesTable,
  VorHouseMembersTable,
  PersonWithVorHouseTable,
} from "./definitions2";

export async function fetchPersonsWithVorHouse() {
  noStore();
  try {
    const data = await sql<PersonWithVorHouseTable[]>`
      SELECT
        persons.id AS person_id,
        persons.name AS person_name,
        vor_houses.id AS house_id,
        vor_houses.family_name AS house_name
      FROM persons
        LEFT JOIN house_members ON house_members.person_id = persons.id
        LEFT JOIN vor_houses ON 
          vor_houses.id = house_members.house_id OR 
          vor_houses.count_id = persons.id OR 
          vor_houses.countess_id = persons.id
      ORDER BY persons.name ASC;
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchVorHouseMembersById(id: string) {
  noStore();
  try {
    const data = await sql<VorHouseMembersTable[]>`
      SELECT
        house_members.house_id,
        house_members.person_id,
        persons.name AS person_name
      FROM house_members
        JOIN persons ON house_members.person_id = persons.id
      WHERE house_members.house_id = ${id}
      ORDER BY persons.name ASC;
    `;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
