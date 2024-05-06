import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { VotingQuestion } from "./definitions2";

export async function fetchQuestionById(id: string) {
  noStore();
  try {
    const data = await sql<VotingQuestion[]>`
      SELECT
        voting_questions.id,
        voting_questions.voting_id,
        voting_questions.type,
        voting_questions.question_text,
        voting_questions.answer1,
        voting_questions.answer1_advocate_id,
        voting_questions.answer2,
        voting_questions.answer2_advocate_id,
        voting_questions.status,
        voting_questions.vote_log
      FROM voting_questions
      WHERE voting_questions.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
