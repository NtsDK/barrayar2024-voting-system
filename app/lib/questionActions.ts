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
  voting_id: z.string(),
  type: z.enum(["master", "player"]),
  question_text: z.string(),
  answer1: z.string(),
  answer1_advocate_id: z.string().min(1),
  answer2: z.string(),
  answer2_advocate_id: z.string().min(1),
  status: z.enum(["raised", "answer1", "answer2", "rescheduling", "canceled"]),
  vote_log: z.string(),
});

const CreateQuestion = FormSchema.omit({ id: true });

// const UpdateVoting = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    // date_time?: string[];
    // status?: string[];
  };
  message?: string | null;
};

export async function createQuestion(prevState: State, formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    voting_id: formData.get("voting_id"),
    type: formData.get("type"),
    question_text: formData.get("question_text"),
    answer1: formData.get("answer1"),
    answer1_advocate_id: formData.get("answer1_advocate_id"),
    answer2: formData.get("answer2"),
    answer2_advocate_id: formData.get("answer2_advocate_id"),
    status: formData.get("status"),
    vote_log: formData.get("vote_log"),
  });
  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания вопроса.",
    };
  }
  const {
    answer1,
    answer1_advocate_id,
    answer2,
    answer2_advocate_id,
    question_text,
    status,
    type,
    vote_log,
    voting_id,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO voting_questions (voting_id, type, question_text, answer1, answer1_advocate_id,
        answer2, answer2_advocate_id, status, vote_log
      )
      VALUES (${voting_id},${type},${question_text},${answer1},${answer1_advocate_id},${answer2},${answer2_advocate_id},${status},${vote_log})
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать вопрос.",
    };
  }
  revalidatePath(VOTINGS_ROUTE);
  redirect(VOTINGS_ROUTE);
}

// export async function updateVoting(
//   id: string,
//   prevState: State,
//   formData: FormData
// ) {
//   const validatedFields = UpdateVoting.safeParse({
//     date_time: formData.get("date_time"),
//     status: formData.get("status"),
//   });

//   // console.log("updateVorHouse", validatedFields);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Voting.",
//     };
//   }

//   const { date_time, status } = validatedFields.data;

//   // const amountInCents = amount * 100;

//   try {
//     await sql`
//         UPDATE council_votings
//         SET date_time = ${date_time}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Voting." };
//   }

//   revalidatePath(VOTINGS_ROUTE);
//   redirect(VOTINGS_ROUTE);
// }

// export async function deleteVoting(id: string) {
//   // throw new Error("Failed to Delete Invoice");
//   try {
//     await sql.begin((sql) => [
//       sql`DELETE FROM voting_questions WHERE voting_questions.voting_id = ${id}`,
//       sql`DELETE FROM council_votings WHERE id = ${id}`,
//     ]);

//     revalidatePath(VOTINGS_ROUTE);
//     return { message: "Deleted Voting." };
//   } catch (error) {
//     return { message: "Database Error: Failed to Delete Voting." };
//   }
// }
