// 001-populationTable.js

exports.up = async client => {
  await client.query(`
    CREATE TABLE city_populations (
      id SERIAL PRIMARY KEY,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      population INTEGER NOT NULL,
      UNIQUE(state, city)  -- Ensures that each city has only one population entry per state
    );

    -- Create an index on state and city columns
    CREATE INDEX idx_state_city
    ON city_populations (state, city);
  `);
};

exports.down = async client => {
  await client.query(`
    DROP INDEX idx_state_city;
    DROP TABLE city_populations;
  `);
};
