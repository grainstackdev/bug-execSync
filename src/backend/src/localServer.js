import express from "express"
import {execSync} from "child_process";

const app = express()

app.use(express.json())

async function start() {
  const command = `
    rm -rf /tmp/postgres-local
    mkdir -p /tmp/postgres-local/data
    initdb -D /tmp/postgres-local/data
    pg_ctl -D /tmp/postgres-local/data -o "-F -p 5555" -l /tmp/postgres-local/logfile start
  `
  execSync(command)
}

function stopFails() {
  const command = `pg_ctl stop -D /tmp/postgres-local/data`
  execSync(command)
  console.log('postgres server stopped')
}

function stopWorks() {
  const command = `
  pg_ctl stop -D /tmp/postgres-local/data
  `
  execSync(command)
  console.log('postgres server stopped')
}



await start()
app.listen(4000)
console.log('server started on 4000')
process.on('SIGINT', () => {
  console.log("stopping");

  stopFails()
  // stopWorks()
  console.log('postgres server stopped')
  process.exit();
});