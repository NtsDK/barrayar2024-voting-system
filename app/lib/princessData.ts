import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { Princess } from "./definitions2";

export async function fetchPrincesses() {
  noStore();
  try {
    const princesses = await sql<Princess[]>`
      SELECT
        princesses.id,
        princesses.name,
        princesses.positive_social_capital,
        princesses.negative_social_capital
      FROM princesses
      ORDER BY name ASC
    `;

    return princesses;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all princesses.");
  }
}
