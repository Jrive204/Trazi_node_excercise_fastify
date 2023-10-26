const client = require('./data/dbConfig'); // adjust the path
const fs = require('fs');
const path = require('path');

const migrationsDirectory = path.join(__dirname, 'data', 'migrations');

// Read all migration files
const migrationFiles = fs
  .readdirSync(migrationsDirectory)
  .filter(file => file.endsWith('.js'))
  .sort(); // Ensure they're in order

const migrations = migrationFiles.map(file => require(path.join(migrationsDirectory, file)));

const direction = process.argv[2]; // "up" or "down"

async function migrate() {
  try {
    for (const migration of migrations) {
      if (direction === 'up') {
        await migration.up(client);
      } else if (direction === 'down') {
        await migration.down(client);
      }
    }
    console.log(`Migrations ran ${direction} successfully.`);
  } catch (error) {
    console.error(`Failed to run migrations: ${error.message}`);
  } finally {
    client.end();
  }
}

migrate();
