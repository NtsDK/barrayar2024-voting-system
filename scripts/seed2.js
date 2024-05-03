// import postgres from 'postgres'
const postgres = require("postgres")
const {
  idMapping,
  persons,
  vorHouses,
  votingQuestions,
  councilVotings,
} = require('../app/lib/placeholder-data2.js');
const bcrypt = require('bcrypt');

(async function main() {
  const sql = postgres()
  const client = {sql, end: () => sql.end()}

  await seedPersons(client);
  await seedVorHouses(client);
  await seedVotingQuestions(client);
  await seedCouncilVotings(client);

  await client.end();
})().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});


async function seedPersons(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "persons" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS persons (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL
      );
    `;

    console.log(`Created "persons" table`);

    // Insert data into the "persons" table
    const insertedPersons = await Promise.all(
      persons.map(async (person) => {
        // const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO persons (id, name, comment)
        VALUES (${idMapping[person.id]}, ${person.name}, ${person.comment})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPersons.length} persons`);

    return {
      createTable,
      persons: insertedPersons,
    };
  } catch (error) {
    console.error('Error seeding persons:', error);
    throw error;
  }
}

async function seedVorHouses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "vorHouses" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS vor_houses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    family_name VARCHAR(255) NOT NULL,
    count_id UUID,
    countess_id UUID
  );
`;

    console.log(`Created "vorHouses" table`);

    // Insert data into the "vorHouses" table
    const insertedVorHouses = await Promise.all(
      vorHouses.map(
        (vorHouse) => client.sql`
        INSERT INTO vor_houses (id, family_name, count_id, countess_id)
        VALUES (${idMapping[vorHouse.id]}, ${vorHouse.familyName}, 
          ${idMapping[vorHouse.count_id] || client.sql`uuid_nil()`}, 
          ${idMapping[vorHouse.countess_id] || client.sql`uuid_nil()`})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedVorHouses.length} vorHouses`);

    return {
      createTable,
      vorHouses: insertedVorHouses,
    };
  } catch (error) {
    console.error('Error seeding vorHouses:', error);
    throw error;
  }
}

async function seedVotingQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "voting_questions" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS voting_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    answer1 VARCHAR(255) NOT NULL,
    answer1Advocate_id UUID,
    answer2 VARCHAR(255) NOT NULL,
    answer2Advocate_id UUID,
    status VARCHAR(255) NOT NULL,
    vote_log TEXT NOT NULL
  );
`;

    console.log(`Created "voting_questions" table`);

    // Insert data into the "voting_questions" table
    const insertedVotingQuestions = await Promise.all(
      votingQuestions.map(
        (votingQuestion) => client.sql`
        INSERT INTO voting_questions (id, type, question_text, answer1, 
          answer1Advocate_id, answer2, answer2Advocate_id, status, vote_log)
        VALUES (${idMapping[votingQuestion.id]}, ${votingQuestion.type}, 
          ${votingQuestion.questionText}, ${votingQuestion.answer1}, 
            ${idMapping[votingQuestion.answer1Advocate_id] || client.sql`uuid_nil()`}, 
            ${votingQuestion.answer2}, ${idMapping[votingQuestion.answer2Advocate_id] || client.sql`uuid_nil()`}, 
            ${votingQuestion.status}, ${votingQuestion.voteLog})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedVotingQuestions.length} votingQuestions`);

    return {
      createTable,
      votingQuestions: insertedVotingQuestions,
    };
  } catch (error) {
    console.error('Error seeding votingQuestions:', error);
    throw error;
  }
}

async function seedCouncilVotings(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "council_votings" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS council_votings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date VARCHAR(255) NOT NULL,
    question1_id UUID,
    question2_id UUID,
    question3_id UUID,
    status VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "council_votings" table`);

    // Insert data into the "council_votings" table
    const insertedCouncilVotings = await Promise.all(
      councilVotings.map(
        (councilVoting) => client.sql`
        INSERT INTO council_votings (id, date, question1_id, question2_id, question3_id, status)
        VALUES (${idMapping[councilVoting.id]}, ${councilVoting.dateTime}, 
          ${idMapping[councilVoting.question1_id] || client.sql`uuid_nil()`}, 
          ${idMapping[councilVoting.question2_id] || client.sql`uuid_nil()`}, 
          ${idMapping[councilVoting.question3_id] || client.sql`uuid_nil()`}, ${councilVoting.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCouncilVotings.length} council_votings`);

    return {
      createTable,
      councilVotings: insertedCouncilVotings,
    };
  } catch (error) {
    console.error('Error seeding council_votings:', error);
    throw error;
  }
}

