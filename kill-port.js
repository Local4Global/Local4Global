const exec = require('child_process').exec;
const port = 5001;

exec(`npx kill-port ${port}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error al liberar el puerto: ${err}`);
    return;
  }
  console.log(`Puerto ${port} liberado`);
  startServer();
});

function startServer() {
  const nodemon = exec('nodemon server.js --signal SIGKILL');

  nodemon.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  nodemon.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  nodemon.on('close', (code) => {
    console.log(`Nodemon exited with code ${code}`);
  });
}

