import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { SessionQuestion } from "./definitions2";

export async function fetchQuestionById(id: string) {
  noStore();
  try {
    const data = await sql<SessionQuestion[]>`
      SELECT
        session_questions.id,
        session_questions.session_id,
        session_questions.type,
        session_questions.question_text,
        session_questions.answer1,
        session_questions.answer1_advocate_id,
        session_questions.answer2,
        session_questions.answer2_advocate_id,
        session_questions.status,
        session_questions.vote_log
      FROM session_questions
      WHERE session_questions.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
