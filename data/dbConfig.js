const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Absolute path to your SQLite database
const DB_PATH = path.join(__dirname, '..', 'trazi_exercise.db');

// This will create a new database or open an existing one
const db = new sqlite3.Database(DB_PATH, err => {
  if (err) {
    console.error('Error connecting to SQLite database:', err);
    return;
  }
  console.log('Connected to the SQLite database.');
});

module.exports = {
  query: (text, params, callback) => db.run(text, params, callback),
  get: (text, params, callback) => db.get(text, params, callback),
  all: (text, params, callback) => db.all(text, params, callback),
};
