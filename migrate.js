const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'trazi_exercise.db');
const db = new sqlite3.Database(dbPath);

const migrationsDirectory = path.join(__dirname, 'data', 'migrations');

// Read all migration files
const migrationFiles = fs
  .readdirSync(migrationsDirectory)
  .filter(file => file.endsWith('.js'))
  .sort();

const migrations = migrationFiles.map(file => require(path.join(migrationsDirectory, file)));

const direction = process.argv[2]; // "up" or "down"

async function migrate() {
  try {
    for (const migration of migrations) {
      if (direction === 'up') {
        await migration.up({ run: db.run.bind(db) }); // Pass the db.run method to the migration
      } else if (direction === 'down') {
        await migration.down({ run: db.run.bind(db) }); // Pass the db.run method to the migration
      }
    }
    console.log(`Migrations ran ${direction} successfully.`);
  } catch (error) {
    console.error(`Failed to run migrations: ${error.message}`);
  } finally {
    db.close();
  }
}

migrate();
