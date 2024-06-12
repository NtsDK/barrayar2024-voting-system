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
  timestamp: z.string(),
  should_update_timestamp: z.string().nullable(),
  question_requests: z.string(),
});

const CreateCountessRequest = FormSchema.omit({
  id: true,
  timestamp: true,
  should_update_timestamp: true,
});

const UpdateCountessRequest = FormSchema.omit({ id: true, session_id: true });

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

export async function updateCountessRequest(
  id: string,
  prevState: State,
  formData: FormData
) {
  console.log("formData", formData);
  const validatedFields = UpdateCountessRequest.safeParse({
    house_id: formData.get("house_id"),
    timestamp: formData.get("timestamp"),
    should_update_timestamp: formData.get("should_update_timestamp"),
    question_requests: formData.get("question_requests"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Countess Request.",
    };
  }

  const { house_id, question_requests, should_update_timestamp, timestamp } =
    validatedFields.data;

  let nextTimestamp =
    should_update_timestamp === "on" ? new Date() : new Date(timestamp);

  try {
    await sql`
        UPDATE countess_session_requests
        SET 
          house_id = ${house_id},
          question_requests = ${question_requests},
          timestamp = ${nextTimestamp}
        WHERE id = ${id}
      `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Countess Request." };
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
