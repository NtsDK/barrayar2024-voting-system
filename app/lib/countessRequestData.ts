import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
// import { Person } from "./definitions2";
import {
  CountessSessionRequest,
  CountessSessionRequestTable,
  CountessSessionRequestTable2,
} from "./voteDefinitions";

export async function fetchCountessRequests(): Promise<
  CountessSessionRequestTable2[]
> {
  noStore();
  try {
    const countessRequests = await sql<CountessSessionRequestTable[]>`
      SELECT
        csr.id,
        csr.house_id,
        vor_houses.family_name AS house_name,
        csr.session_id,
        csr.timestamp,
        csr.question_requests
      FROM countess_session_requests as csr
        INNER JOIN vor_houses ON 
          vor_houses.id = csr.house_id
      ORDER BY
        csr.timestamp
    `;

    const list2: CountessSessionRequestTable2[] = countessRequests.map(
      (el) => ({
        ...el,
        question_requests: JSON.parse(el.question_requests),
      })
    );

    return list2;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all persons.");
  }
}
