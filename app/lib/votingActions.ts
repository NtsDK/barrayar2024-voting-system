"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { VOTINGS_ROUTE } from "@/routes";

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  date_time: z
    .string({
      invalid_type_error: "Выберите время голосования.",
    })
    .min(1),
  status: z.enum([
    "planned",
    "preparing",
    "countessVoting",
    "countVoting",
    "finished",
  ]),
});

const CreateVoting = FormSchema.omit({ id: true });

const UpdateVoting = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    date_time?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createVoting(prevState: State, formData: FormData) {
  const validatedFields = CreateVoting.safeParse({
    date_time: formData.get("date_time"),
    status: formData.get("status"),
    title: formData.get("title"),
  });

  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания персонажа.",
    };
  }

  const { date_time, status, title } = validatedFields.data;

  // Test it out:
  // console.log(rawFormData);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO council_votings (date_time, status, title)
      VALUES (${date_time},${status},${title})
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать голосование.",
    };
  }

  revalidatePath(VOTINGS_ROUTE);
  redirect(VOTINGS_ROUTE);
}

export async function updateVoting(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateVoting.safeParse({
    date_time: formData.get("date_time"),
    status: formData.get("status"),
    title: formData.get("title"),
  });

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Voting.",
    };
  }

  const { date_time, status, title } = validatedFields.data;

  // const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE council_votings
        SET date_time = ${date_time}, status = ${status}, title = ${title}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Voting." };
  }

  revalidatePath(VOTINGS_ROUTE);
  redirect(VOTINGS_ROUTE);
}

export async function deleteVoting(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql.begin((sql) => [
      sql`DELETE FROM voting_questions WHERE voting_questions.voting_id = ${id}`,
      sql`DELETE FROM council_votings WHERE id = ${id}`,
    ]);

    revalidatePath(VOTINGS_ROUTE);
    return { message: "Deleted Voting." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Voting." };
  }
}
