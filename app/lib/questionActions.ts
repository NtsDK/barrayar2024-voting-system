"use server";

import { z } from "zod";
// import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@/db";
import { SESSIONS_ROUTE } from "@/routes";
import { VoteLog } from "./voteDefinitions";
import { assert } from "./utils";

const FormSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  type: z.enum(["master", "player"]),
  question_text: z.string(),
  answer1: z.string(),
  answer1_advocate_id: z.string().min(1),
  answer2: z.string(),
  answer2_advocate_id: z.string().min(1),
  status: z.enum(["raised", "answer1", "answer2", "rescheduling", "canceled"]),
  vote_log: z.string(),
  update_type: z.enum(["save", "apply"]),
});

const CreateQuestion = FormSchema.omit({ id: true, vote_log: true, update_type: true });

const UpdateQuestion = FormSchema.omit({
  id: true,
  session_id: true,
  vote_log: true,
  update_type: true,
});

const UpdateQuestionVoteLog = FormSchema.omit({
  id: true,
  session_id: true,
  type: true,
  question_text: true,
  answer1: true,
  answer1_advocate_id: true,
  answer2: true,
  answer2_advocate_id: true,
  status: true,
});

export type State = {
  errors?: {
    // date_time?: string[];
    // status?: string[];
  };
  message?: string | null;
};

export async function createQuestion(prevState: State, formData: FormData) {
  const validatedFields = CreateQuestion.safeParse({
    session_id: formData.get("session_id"),
    type: formData.get("type"),
    question_text: formData.get("question_text"),
    answer1: formData.get("answer1"),
    answer1_advocate_id: formData.get("answer1_advocate_id"),
    answer2: formData.get("answer2"),
    answer2_advocate_id: formData.get("answer2_advocate_id"),
    status: formData.get("status"),
  });
  // console.log("validatedFields", validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Пропущены необходимые поля. Ошибка создания вопроса.",
    };
  }
  const { answer1, answer1_advocate_id, answer2, answer2_advocate_id, question_text, status, type, session_id } =
    validatedFields.data;

  try {
    await sql`
      INSERT INTO session_questions 
      ( 
        session_id, 
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
        ${session_id},
        ${type},
        ${question_text},
        ${answer1},
        ${answer1_advocate_id},
        ${answer2},
        ${answer2_advocate_id},
        ${status},
        ${JSON.stringify({} satisfies VoteLog)}
      )
    `;
  } catch (error) {
    return {
      message: "Ошибка базы данных: не удалось создать вопрос.",
    };
  }
  revalidatePath(SESSIONS_ROUTE);
  redirect(SESSIONS_ROUTE);
}

export async function updateQuestion(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateQuestion.safeParse({
    type: formData.get("type"),
    question_text: formData.get("question_text"),
    answer1: formData.get("answer1"),
    answer1_advocate_id: formData.get("answer1_advocate_id"),
    answer2: formData.get("answer2"),
    answer2_advocate_id: formData.get("answer2_advocate_id"),
    status: formData.get("status"),
  });

  // console.log("updateVorHouse", validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Question.",
    };
  }

  const { answer1, answer1_advocate_id, answer2, answer2_advocate_id, question_text, status, type } =
    validatedFields.data;

  // const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE session_questions
        SET 
          answer1 = ${answer1},
          answer1_advocate_id = ${answer1_advocate_id},
          answer2 = ${answer2},
          answer2_advocate_id = ${answer2_advocate_id},
          question_text = ${question_text},
          status = ${status},
          type = ${type}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Question." };
  }

  revalidatePath(SESSIONS_ROUTE);
  redirect(SESSIONS_ROUTE);
}

export async function updateQuestionVoteLog(id: string, prevState: State, formData: FormData) {
  // console.log('formData.get("update_type")', formData.get("update_type"), new Date().toLocaleString());
  const validatedFields = UpdateQuestionVoteLog.safeParse({
    vote_log: formData.get("vote_log"),
    update_type: formData.get("update_type"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Question Vote Log.",
    };
  }

  const { vote_log, update_type } = validatedFields.data;

  try {
    if (update_type === "save") {
      await sql`
          UPDATE session_questions
          SET 
            vote_log = ${vote_log}
          WHERE id = ${id}
        `;
    } else {
      const voteLog: VoteLog = JSON.parse(vote_log);
      assert(voteLog.precomputeVotesResult);
      const { questionStatus, socCapitalExpenses } = voteLog.precomputeVotesResult;
      const timestamp = new Date();

      const res = await sql.begin(async (sql) => {
        const questions = await sql<{ question_text: string }[]>`
          SELECT
            session_questions.question_text
          FROM
            session_questions
          WHERE id = ${id}
        `;

        const vorHouses = await sql<{ id: string; social_capital: number }[]>`
          SELECT
            vor_houses.id,
            vor_houses.social_capital
          FROM
            vor_houses
        `;

        const vorHouseIndex = vorHouses.reduce((acc: Record<string, number>, vorHouse) => {
          acc[vorHouse.id] = vorHouse.social_capital;
          return acc;
        }, {});

        const { question_text } = questions[0];
        await sql`
          UPDATE session_questions
            SET
              status = ${questionStatus},
              vote_log = ${vote_log}
            WHERE id = ${id}
        `;

        for (const record of socCapitalExpenses) {
          await sql`
            UPDATE vor_houses
              SET
                social_capital = social_capital - ${record.totalCountsExpenses}
              WHERE id = ${record.house_id}
          `;

          await sql`INSERT INTO soc_cap_log (source, house_name, recipient_name, timestamp, comment, amount, total)
            VALUES (
              'Голосование',
              ${record.house_name},
              ${record.house_name},
              ${timestamp},
              ${`Голосование по вопросу: ${question_text}`},
              ${-record.totalCountsExpenses},
              ${vorHouseIndex[record.house_id] - record.totalCountsExpenses}
            )`;
        }
      });
      // const res = await sql.begin((sql) => [
      //   sql`
      //     UPDATE session_questions
      //       SET
      //         status = ${questionStatus},
      //         vote_log = ${vote_log}
      //       WHERE id = ${id}
      //   `,
      //   ...socCapitalExpenses.map(
      //     (record) => sql`
      //     UPDATE vor_houses
      //       SET
      //         social_capital = social_capital - ${record.totalCountsExpenses}
      //       WHERE id = ${record.house_id}
      //   `,
      //   ),
      // ]);
      // console.log("apply question votes", res);
    }
  } catch (error) {
    return { message: "Database Error: Failed to Update Question Vote Log." };
  }

  revalidatePath(SESSIONS_ROUTE);
  redirect(SESSIONS_ROUTE);
}

export async function deleteQuestion(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await sql`DELETE FROM session_questions WHERE session_questions.id = ${id}`;

    revalidatePath(SESSIONS_ROUTE);
    return { message: "Deleted Question." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Question." };
  }
}
