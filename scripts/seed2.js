// import postgres from 'postgres'
const postgres = require("postgres");
const {
  idMapping,
  persons,
  vorHouses,
  sessionQuestions,
  councilSessions,
  princesses,
  houseMembers,
  countessSessionRequests,
  socCapCosts,
  users,
} = require("../app/lib/placeholder-data2.js");
const bcrypt = require("bcrypt");

(async function main() {
  const sql = postgres();
  const client = { sql, end: () => sql.end() };

  await client.sql`DROP TABLE IF EXISTS users`;
  await client.sql`DROP TABLE IF EXISTS persons`;
  await client.sql`DROP TABLE IF EXISTS vor_houses`;
  await client.sql`DROP TABLE IF EXISTS council_sessions`;
  await client.sql`DROP TABLE IF EXISTS session_questions`;
  await client.sql`DROP TABLE IF EXISTS princesses`;
  await client.sql`DROP TABLE IF EXISTS house_members`;
  await client.sql`DROP TABLE IF EXISTS countess_session_requests`;
  await client.sql`DROP TABLE IF EXISTS soc_cap_costs`;
  await client.sql`DROP TABLE IF EXISTS soc_cap_log`;
  await initUuidOssp(client);
  await seedUsers(client);
  await seedPersons(client);
  await seedVorHouses(client);
  await seedCouncilSessions(client);
  await seedSessionQuestions(client);
  await seedPrincesses(client);
  await seedHouseMembers(client);
  await seedCountessSessionRequests(client);
  await seedSocCapCosts(client);
  await seedSocCapLog(client);

  await client.end();
})().catch((err) => {
  console.error("An error occurred while attempting to seed the database:", err);
});

async function initUuidOssp(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  } catch (error) {
    console.error("Error seeding uuid-ossp extension:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPersons(client) {
  try {
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
      persons.map(async ([id, name, comment]) => {
        // const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO persons (id, name, comment)
          VALUES (${idMapping(id)}, ${name}, ${comment || ""})
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
    console.error("Error seeding persons:", error);
    throw error;
  }
}

async function seedVorHouses(client) {
  try {
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
          ${idMapping(vorHouse.id)}, 
          ${vorHouse.familyName}, 
          ${idMapping(vorHouse.count_id) || client.sql`uuid_nil()`}, 
          ${idMapping(vorHouse.countess_id) || client.sql`uuid_nil()`},
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
    console.error("Error seeding vorHouses:", error);
    throw error;
  }
}

async function seedCouncilSessions(client) {
  try {
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
            ${idMapping(councilSession.id)}, 
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
    console.error("Error seeding council_sessions:", error);
    throw error;
  }
}

async function seedSessionQuestions(client) {
  try {
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
            ${idMapping(sessionQuestion.id)}, 
            ${idMapping(sessionQuestion.session_id)}, 
            ${sessionQuestion.type}, 
            ${sessionQuestion.questionText}, 
            ${sessionQuestion.answer1}, 
            ${idMapping(sessionQuestion.answer1_advocate_id) || client.sql`uuid_nil()`}, 
            ${sessionQuestion.answer2}, 
            ${idMapping(sessionQuestion.answer2_advocate_id) || client.sql`uuid_nil()`}, 
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
    console.error("Error seeding sessionQuestions:", error);
    throw error;
  }
}

async function seedPrincesses(client) {
  try {
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
            ${idMapping(princess.id)}, 
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
    console.error("Error seeding princesses:", error);
    throw error;
  }
}

async function seedHouseMembers(client) {
  try {
    // Create the "session_questions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS house_members (
        house_id UUID NOT NULL,
        person_id UUID NOT NULL
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
            ${idMapping(houseMember.house_id)}, 
            ${idMapping(houseMember.person_id)}
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
    console.error("Error seeding houseMembers:", error);
    throw error;
  }
}

async function seedCountessSessionRequests(client) {
  try {
    // Create the "countess_session_requests" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS countess_session_requests (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        house_id UUID NOT NULL,
        session_id UUID NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL,
        question_requests TEXT NOT NULL
      );
    `;

    console.log(`Created "countess_session_requests" table`);

    // Insert data into the "countess_session_requests" table
    const insertedCountessSessionRequests = await Promise.all(
      countessSessionRequests.map(
        (countessSessionRequest) => client.sql`
          INSERT INTO countess_session_requests (
            id,
            house_id, 
            session_id,
            timestamp,
            question_requests
          )
          VALUES (
            ${idMapping(countessSessionRequest.id)}, 
            ${idMapping(countessSessionRequest.house_id)}, 
            ${idMapping(countessSessionRequest.session_id)},
            ${countessSessionRequest.timestamp},
            ${countessSessionRequest.question_requests}
          )
        `,
      ),
    );

    // проверял, что дата на входе и на выходе получается одна и та же
    // const selectTable = await client.sql`
    //   SELECT
    //     csr.id,
    //     csr.house_id,
    //     csr.session_id,
    //     csr.timestamp,
    //     csr.question_requests
    //   FROM countess_session_requests as csr
    // `;

    // console.log("old timestamp", countessSessionRequests[0].timestamp, "new timestamp", selectTable[0].timestamp)

    console.log(`Seeded ${insertedCountessSessionRequests.length} countessSessionRequests`);

    return {
      createTable,
      countessSessionRequests: insertedCountessSessionRequests,
    };
  } catch (error) {
    console.error("Error seeding countess_session_requests:", error);
    throw error;
  }
}

async function seedSocCapCosts(client) {
  try {
    // Create the "countess_session_requests" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS soc_cap_costs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        settings TEXT NOT NULL
      );
    `;

    console.log(`Created "soc_cap_costs" table`);

    // Insert data into the "soc_cap_costs" table
    const insertedSocCapCosts = await client.sql`
        INSERT INTO soc_cap_costs (
          id,
          settings
        )
        VALUES (
          ${idMapping(socCapCosts.id)}, 
          ${socCapCosts.settings}
        )
      `;
    console.log(`Seeded soc_cap_costs`);

    return {
      createTable,
      socCapCosts: insertedSocCapCosts,
    };
  } catch (error) {
    console.error("Error seeding soc_cap_costs:", error);
    throw error;
  }
}

async function seedSocCapLog(client) {
  try {
    // Create the "countess_session_requests" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS soc_cap_log (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        source VARCHAR(255) NOT NULL,
        house_name VARCHAR(255) NOT NULL,
        recipient_name VARCHAR(255) NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL,
        comment TEXT NOT NULL,
        amount INT NOT NULL,
        total INT NOT NULL
      );
    `;

    console.log(`Created "soc_cap_log" table`);

    // Insert data into the "soc_cap_costs" table
    const insertedSocCapLogs = await client.sql`
        INSERT INTO soc_cap_log (
          id,
          source,
          house_name,
          recipient_name,
          timestamp,
          comment,
          amount,
          total
        )
        VALUES (
          ${idMapping("socCapLog")},
          'мастер',
          'house_name',
          'recipient_name',
          ${new Date()},
          'comment',
          20,
          50
        )
      `;
    console.log(`Seeded soc_cap_log`);

    return {
      createTable,
      socCapCosts: insertedSocCapLogs,
    };
  } catch (error) {
    console.error("Error seeding soc_cap_log:", error);
    throw error;
  }
}
