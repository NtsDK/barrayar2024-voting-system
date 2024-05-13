// import postgres from 'postgres'
const postgres = require("postgres")
const {
  idMapping,
  persons,
  vorHouses,
  sessionQuestions,
  councilSessions,
  princesses,
  houseMembers,
} = require('../app/lib/placeholder-data2.js');
const bcrypt = require('bcrypt');

(async function main() {
  const sql = postgres()
  const client = {sql, end: () => sql.end()}

  await client.sql`DROP TABLE IF EXISTS persons`;
  await client.sql`DROP TABLE IF EXISTS vor_houses`;
  await client.sql`DROP TABLE IF EXISTS council_sessions`;
  await client.sql`DROP TABLE IF EXISTS session_questions`;
  await client.sql`DROP TABLE IF EXISTS princesses`;
  await client.sql`DROP TABLE IF EXISTS house_members`;
  await seedPersons(client);
  await seedVorHouses(client);
  await seedCouncilSessions(client);
  await seedSessionQuestions(client);
  await seedPrincesses(client);
  await seedHouseMembers(client);

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
        countess_id UUID,
        social_capital INT NOT NULL
      );
    `;

    console.log(`Created "vorHouses" table`);

    // Insert data into the "vorHouses" table
    const insertedVorHouses = await Promise.all(
      vorHouses.map(
        (vorHouse) => client.sql`
        INSERT INTO vor_houses (id, family_name, count_id, countess_id, social_capital)
        VALUES (
          ${idMapping[vorHouse.id]}, 
          ${vorHouse.familyName}, 
          ${idMapping[vorHouse.count_id] || client.sql`uuid_nil()`}, 
          ${idMapping[vorHouse.countess_id] || client.sql`uuid_nil()`},
          ${vorHouse.socialCapital}
        )
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

async function seedCouncilSessions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "council_sessions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS council_sessions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date_time VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "council_sessions" table`);

    // Insert data into the "council_sessions" table
    const insertedCouncilSessions = await Promise.all(
      councilSessions.map(
        (councilSession) => client.sql`
          INSERT INTO council_sessions (id, title, date_time, status)
          VALUES (
            ${idMapping[councilSession.id]}, 
            ${councilSession.title},
            ${councilSession.dateTime}, 
            ${councilSession.status}
          )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedCouncilSessions.length} council_sessions`);

    return {
      createTable,
      councilSessions: insertedCouncilSessions,
    };
  } catch (error) {
    console.error('Error seeding council_sessions:', error);
    throw error;
  }
}

async function seedSessionQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "session_questions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS session_questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        session_id UUID,
        type VARCHAR(255) NOT NULL,
        question_text VARCHAR(255) NOT NULL,
        answer1 VARCHAR(255) NOT NULL,
        answer1_advocate_id UUID,
        answer2 VARCHAR(255) NOT NULL,
        answer2_advocate_id UUID,
        status VARCHAR(255) NOT NULL,
        vote_log TEXT NOT NULL
      );
    `;

    console.log(`Created "session_questions" table`);

    // Insert data into the "session_questions" table
    const insertedSessionQuestions = await Promise.all(
      sessionQuestions.map(
        (sessionQuestion) => client.sql`
          INSERT INTO session_questions (
            id, 
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
          VALUES (
            ${idMapping[sessionQuestion.id]}, 
            ${idMapping[sessionQuestion.session_id]}, 
            ${sessionQuestion.type}, 
            ${sessionQuestion.questionText}, 
            ${sessionQuestion.answer1}, 
            ${idMapping[sessionQuestion.answer1_advocate_id] || client.sql`uuid_nil()`}, 
            ${sessionQuestion.answer2}, 
            ${idMapping[sessionQuestion.answer2_advocate_id] || client.sql`uuid_nil()`}, 
            ${sessionQuestion.status}, 
            ${sessionQuestion.voteLog}
          )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedSessionQuestions.length} sessionQuestions`);

    return {
      createTable,
      sessionQuestions: insertedSessionQuestions,
    };
  } catch (error) {
    console.error('Error seeding sessionQuestions:', error);
    throw error;
  }
}

async function seedPrincesses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "session_questions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS princesses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        positive_social_capital INT NOT NULL,
        negative_social_capital INT NOT NULL
      );
    `;

    console.log(`Created "princesses" table`);

    // Insert data into the "princesses" table
    const insertedPrincesses = await Promise.all(
      princesses.map(
        (princess) => client.sql`
          INSERT INTO princesses (
            id, 
            name, 
            positive_social_capital, 
            negative_social_capital
          )
          VALUES (
            ${idMapping[princess.id]}, 
            ${princess.name}, 
            ${princess.positiveSocialCapital}, 
            ${princess.negativeSocialCapital}
          )
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedPrincesses.length} princesses`);

    return {
      createTable,
      princesses: insertedPrincesses,
    };
  } catch (error) {
    console.error('Error seeding princesses:', error);
    throw error;
  }
}

async function seedHouseMembers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "session_questions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS house_members (
        house_id UUID,
        person_id UUID
      );
    `;

    console.log(`Created "house_members" table`);

    // Insert data into the "house_members" table
    const insertedHouseMembers = await Promise.all(
      houseMembers.map(
        (houseMember) => client.sql`
          INSERT INTO house_members (
            house_id, 
            person_id
          )
          VALUES (
            ${idMapping[houseMember.house_id]}, 
            ${idMapping[houseMember.person_id]}
          )
        `,
      ),
    );

    console.log(`Seeded ${insertedHouseMembers.length} houseMembers`);

    return {
      createTable,
      houseMembers: insertedHouseMembers,
    };
  } catch (error) {
    console.error('Error seeding houseMembers:', error);
    throw error;
  }
}

