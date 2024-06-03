"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";

export async function deleteCountessRequest(id: string) {
  try {
    await sql`DELETE FROM countess_session_requests WHERE id = ${id}`;
    revalidatePath(COUNTESS_REQUESTS_ROUTE);
    return { message: "Deleted Countess Request." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Countess Request." };
  }
}
