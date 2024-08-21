const { exec } = require("child_process");
const path = require("node:path");
require("dotenv").config();
// console.log(process.env);

// пример команды на восстановление из резервной копии
// "C:\Program Files\PostgreSQL\16\bin\psql" --dbname=postgresql://postgres:PASSWORD@127.0.0.1:5432/next-db < "C:\Users\Tim\workspace\nextjs-dashboard\backups\br-21-08-2024-17-19-46.dump"

const { BR_PG_BIN_PATH, PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD, BR_BACKUP_INTERVAL_MILLIS } = process.env;

console.log("config", {
  BR_PG_BIN_PATH,
  PGHOST,
  PGPORT,
  PGDATABASE,
  PGUSER,
  BR_BACKUP_INTERVAL_MILLIS,
});

const dbname = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

function doBackup() {
  const dateStr = new Date().toLocaleString();

  console.log("backup at", dateStr);
  const dumpFile = path.resolve("./backups", `br-${dateStr.replace(/([^a-z0-9]+)/gi, "-")}.dump`);

  const command = `"${path.resolve(BR_PG_BIN_PATH, "pg_dump")}" --file=${dumpFile} --clean --dbname=${dbname}`;

  // console.log(process.env.BR_PG_BIN_PATH);
  // console.log(command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

doBackup();

setInterval(() => doBackup(), Number(BR_BACKUP_INTERVAL_MILLIS));
