import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import { RawSessionQuestion, SessionQuestion } from "./definitions2";
import { VoteLog } from "./voteDefinitions";
import { assertVoteLog } from "./voteValidation";

export async function fetchQuestionById(id: string) {
  noStore();
  try {
    const data = await sql<RawSessionQuestion[]>`
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

    return rawSessionQuestionToSessionQuestion(data[0]);
  } catch (error) {
    console.error("Database Error:", error);
  }
}

export async function fetchCountessRequestQuestions() {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<RawSessionQuestion[]>`
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
      WHERE session_questions.session_id IN (
        SELECT 
          council_sessions.id
        FROM 
          council_sessions
        WHERE
          council_sessions.status = 'countessVoting'
      )
      ORDER BY session_questions.question_text;
    `;
    return data.map((item) => rawSessionQuestionToSessionQuestion(item));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sessions.");
  }
}

function rawSessionQuestionToSessionQuestion(rawSessionQuestion: RawSessionQuestion): SessionQuestion {
  let vote_log: VoteLog = {};
  try {
    vote_log = JSON.parse(rawSessionQuestion.vote_log, (key, value) => {
      if (key === "timestamp") {
        return new Date(value);
      }
      return value;
    });
    assertVoteLog(vote_log);
  } catch (err) {
    console.error("rawSessionQuestionToSessionQuestion", err);
    vote_log = {};
  }

  return {
    id: rawSessionQuestion.id,
    session_id: rawSessionQuestion.session_id,
    type: rawSessionQuestion.type,
    question_text: rawSessionQuestion.question_text,
    answer1: rawSessionQuestion.answer1,
    answer1_advocate_id: rawSessionQuestion.answer1_advocate_id,
    answer2: rawSessionQuestion.answer2,
    answer2_advocate_id: rawSessionQuestion.answer2_advocate_id,
    status: rawSessionQuestion.status,
    vote_log,
  };
}
