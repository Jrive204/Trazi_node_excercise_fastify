const server = require('./api/server');

const sqlite3 = require('sqlite3').verbose();

const dbPath = './trazi_exercise.db';
global.db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('SQLite database connected.');
  }
});

const port = 5555;

server.listen({ port: port, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});

process.on('exit', () => {
  global.db.close(err => {
    if (err) {
      console.error(err.message);
    }
    console.log('SQLite database connection closed.');
  });
});
