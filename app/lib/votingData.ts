import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@/db";
import {
  CouncilVoting,
  CouncilVotingsList,
  VotingQuestionsList,
} from "./definitions2";

// const ITEMS_PER_PAGE = 15;

export async function fetchFilteredCouncilVotings(
  query: string,
  currentPage: number
) {
  noStore();
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const votingsPromise = sql<CouncilVoting[]>`
      SELECT
        council_votings.id,
        council_votings.date_time,
        council_votings.status
      FROM council_votings
      ORDER BY 
        council_votings.date_time ASC
    `;

    const questionsPromise = sql<VotingQuestionsList[]>`
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
        voting_questions.vote_log,
        advocate1.name AS answer1_advocate_name,
        advocate2.name AS answer2_advocate_name
      FROM voting_questions
        LEFT JOIN persons AS advocate1 ON voting_questions.answer1_advocate_id = advocate1.id
        LEFT JOIN persons AS advocate2 ON voting_questions.answer2_advocate_id = advocate2.id
      ORDER BY 
        voting_questions.question_text ASC
    `;

    const [votings, questions] = await Promise.all([
      votingsPromise,
      questionsPromise,
    ]);

    const votings2: CouncilVotingsList[] = votings.map((voting) => ({
      ...voting,
      questions: [],
    }));

    const votingsIndex = votings2.reduce(
      (acc: Record<string, CouncilVotingsList>, voting) => {
        acc[voting.id] = voting;
        return acc;
      },
      {}
    );

    for (const question of questions) {
      const voting = votingsIndex[question.voting_id];
      if (!voting) {
        console.warn(
          "Не найдено голосование по id",
          question.voting_id,
          question
        );
        continue;
      }
      voting.questions.push(question);
    }

    // console.log("vorHouses", vorHouses);
    // console.log("votings2", JSON.stringify(votings2, null, "  "));

    return votings2;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch vorHouses.");
  }
}

export async function fetchVotingById(id: string) {
  noStore();
  try {
    const data = await sql<CouncilVoting[]>`
      SELECT
        council_votings.id,
        council_votings.date_time,
        council_votings.status
      FROM council_votings
      WHERE council_votings.id = ${id};
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
  }
}
