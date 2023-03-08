import {execSync} from "child_process";

function start() {
  setTimeout(() => {
    start()
  }, 1000)
}

function stopFails() {
  const command = `npm -v`
  execSync(command)
  console.log('postgres server stopped')
}

function stopWorks() {
  const command = `
  npm -v
  `
  execSync(command)
  console.log('postgres server stopped')
}

start()
// app.listen(4000)
console.log('server started on 4000')
process.on('SIGINT', () => {
  console.log("stopping");

  stopFails()
  // stopWorks()
  console.log('postgres server stopped')
  process.exit();
});