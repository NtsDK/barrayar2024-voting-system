// const postgres = require("postgres")

import postgres from "postgres";
import { ZERO_UUID } from "./constants";

console.log("Run db.ts");

export const sql = postgres({
  idle_timeout: 20,
  transform: {
    value: {
      from(value, column) {
        if (value === ZERO_UUID) {
          // console.log("transform", value, column);
          return null;
        }
        return value;
      },
    },
  },
});
const client = { sql, end: () => sql.end() };

async function sqlEnd() {
  console.log("called sqlEnd");
  sql.end();
}

// import { createLogger } from "./utils";
// import { sqlEnd } from "./api/pgPool";

// introduce abstraction of process and add handling of unhandled errors and exceptions and signals.

// https://thomashunter.name/posts/2021-03-08-the-death-of-a-nodejs-process

// const logger = createLogger('processTerminationHandler.ts');

// process.on("uncaughtException", async (error) => {
//   // logger.send("An uncaught exception has occured", error, () => {
//   // logger.error("An uncaught exception has occured", error);
//   await sqlEnd();
//   process.exit(1);
//   // });
// });

// process.on('unhandledRejection', (reason, promise) => {
//   logger.error("An unhandledRejection has occured", reason, promise);
// });

process.on("SIGHUP", async () => {
  await sqlEnd();
  console.info("Received: SIGHUP");
});
process.on("SIGINT", async () => {
  await sqlEnd();
  console.info("Received: SIGINT");
});
process.on("SIGQUIT", async () => {
  await sqlEnd();
  console.info("Received: SIGQUIT");
});
process.on("SIGTERM", async () => {
  await sqlEnd();
  console.info("Received: SIGTERM");
});
