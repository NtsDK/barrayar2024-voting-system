import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import {
  CouncilSession,
  CouncilSessionsList,
  SessionQuestionsList,
} from "./definitions2";

// const ITEMS_PER_PAGE = 15;

export async function fetchFilteredCouncilSessions(
  query: string,
  currentPage: number
) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sessionsPromise = sql<CouncilSession[]>`
      SELECT
        council_sessions.id,
        council_sessions.title,
        council_sessions.date_time,
        council_sessions.status
      FROM council_sessions
      ORDER BY 
        council_sessions.date_time ASC
    `;

    const questionsPromise = sql<SessionQuestionsList[]>`
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
        session_questions.vote_log,
        advocate1.name AS answer1_advocate_name,
        advocate2.name AS answer2_advocate_name
      FROM session_questions
        LEFT JOIN persons AS advocate1 ON session_questions.answer1_advocate_id = advocate1.id
        LEFT JOIN persons AS advocate2 ON session_questions.answer2_advocate_id = advocate2.id
      ORDER BY 
        session_questions.question_text ASC
    `;

    const [sessions, questions] = await Promise.all([
      sessionsPromise,
      questionsPromise,
    ]);

    const sessions2: CouncilSessionsList[] = sessions.map((session) => ({
      ...session,
      questions: [],
    }));

    const sessionsIndex = sessions2.reduce(
      (acc: Record<string, CouncilSessionsList>, session) => {
        acc[session.id] = session;
        return acc;
      },
      {}
    );

    for (const question of questions) {
      const session = sessionsIndex[question.session_id];
      if (!session) {
        console.warn(
          "Не найдено голосование по id",
          question.session_id,
          question
        );
        continue;
      }
      session.questions.push(question);
    }

    // console.log("vorHouses", vorHouses);
    // console.log("sessions2", JSON.stringify(sessions2, null, "  "));

    return sessions2;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch vorHouses.");
  }
}

export async function fetchSessionById(id: string) {
  noStore();
  try {
    const data = await sql<CouncilSession[]>`
      SELECT
        council_sessions.id,
        council_sessions.title,
        council_sessions.date_time,
        council_sessions.status
      FROM council_sessions
      WHERE council_sessions.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
