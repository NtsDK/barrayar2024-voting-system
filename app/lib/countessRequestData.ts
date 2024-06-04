import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
// import { Person } from "./definitions2";
import {
  CountessSessionRequest,
  CountessSessionRequestTable,
  CountessSessionRequestTable2,
} from "./voteDefinitions";
import { MinimalVorHouse, VorHouse } from "./definitions2";

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
    throw new Error("Failed to fetch CountessRequests.");
  }
}

export async function fetchVorHousesWithoutCountessRequests(): Promise<
  MinimalVorHouse[]
> {
  noStore();
  try {
    const minimalVorHouseList = await sql<MinimalVorHouse[]>`
    SELECT
      vor_houses2.id,
      vor_houses2.family_name
    FROM (
      SELECT
        vor_houses.id,
        vor_houses.family_name,
        used_house_ids.house_id as countess_house_id,
        CASE WHEN used_house_ids.house_id <> uuid_nil()
          THEN TRUE
          ELSE FALSE
        END as tval
      FROM vor_houses
        LEFT JOIN (
          SELECT
            csr.house_id
          FROM council_sessions
            INNER JOIN countess_session_requests as csr
              ON council_sessions.id = csr.session_id
          WHERE
            council_sessions.status = 'countessVoting' 
        ) as used_house_ids ON
          used_house_ids.house_id = vor_houses.id
    ) as vor_houses2
    WHERE 
      vor_houses2.tval = FALSE
    ORDER BY
      vor_houses2.family_name
    `;
    // У меня получилось только через tval убрать не пустые uuid.
    // -- WHERE vor_houses2.countess_house_id = uuid_nil()
    // -- WHERE vor_houses2.countess_house_id = vor_houses2.id

    return minimalVorHouseList;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch vor houses.");
  }
}
