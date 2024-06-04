"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { COUNTESS_REQUESTS_ROUTE } from "@/routes";

const FormSchema = z.object({
  id: z.string(),
  house_id: z.string(),
  session_id: z.string(),
  timestamp: z.date(),
  question_requests: z.string(),
});

const CreateCountessRequest = FormSchema.omit({ id: true, timestamp: true });

const UpdateCountessRequest = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    house_id?: string[];
    session_id?: string[];
    question_requests?: string[];
  };
  message?: string | null;
};

export async function createCountessRequest(
  prevState: State,
  formData: FormData
) {
  const validatedFields = CreateCountessRequest.safeParse({
    house_id: formData.get("house_id"),
    session_id: formData.get("session_id"),
    question_requests: formData.get("question_requests"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания заявки графини.",
    };
  }

  const { house_id, question_requests, session_id } = validatedFields.data;

  const timestamp = new Date();

  try {
    await sql`
      INSERT INTO countess_session_requests (house_id, session_id, timestamp, question_requests)
      VALUES (${house_id}, ${session_id}, ${timestamp}, ${question_requests})
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать заявку графини.",
    };
  }

  revalidatePath(COUNTESS_REQUESTS_ROUTE);
  redirect(COUNTESS_REQUESTS_ROUTE);
}

export async function deleteCountessRequest(id: string) {
  try {
    await sql`DELETE FROM countess_session_requests WHERE id = ${id}`;
    revalidatePath(COUNTESS_REQUESTS_ROUTE);
    return { message: "Deleted Countess Request." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Countess Request." };
  }
}
