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

const UpdateQuestion = FormSchema.omit({ id: true });

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
      INSERT INTO voting_questions 
      ( 
        voting_id, 
        type, 
        question_text, 
        answer1, 
        answer1_advocate_id,
        answer2, 
        answer2_advocate_id, 
        status, 
        vote_log
      )
      VALUES 
      (
        ${voting_id},
        ${type},
        ${question_text},
        ${answer1},
        ${answer1_advocate_id},
        ${answer2},
        ${answer2_advocate_id},
        ${status},
        ${vote_log}
      )
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать вопрос.",
    };
  }
  revalidatePath(VOTINGS_ROUTE);
  redirect(VOTINGS_ROUTE);
}

export async function updateQuestion(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateQuestion.safeParse({
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

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Question.",
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

  // const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE voting_questions
        SET 
          answer1 = ${answer1},
          answer1_advocate_id = ${answer1_advocate_id},
          answer2 = ${answer2},
          answer2_advocate_id = ${answer2_advocate_id},
          question_text = ${question_text},
          status = ${status},
          type = ${type},
          vote_log = ${vote_log},
          voting_id = ${voting_id}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Question." };
  }

  revalidatePath(VOTINGS_ROUTE);
  redirect(VOTINGS_ROUTE);
}

export async function deleteQuestion(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM voting_questions WHERE voting_questions.id = ${id}`;

    revalidatePath(VOTINGS_ROUTE);
    return { message: "Deleted Question." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Question." };
  }
}
