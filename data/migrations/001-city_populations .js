exports.up = async client => {
  await new Promise((resolve, reject) => {
    client.run(
      `
      CREATE TABLE IF NOT EXISTS city_populations (
        id INTEGER PRIMARY KEY,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        population INTEGER NOT NULL,
        UNIQUE(state, city)  -- Ensures that each city has only one population entry per state
      );
    `,
      err => {
        if (err) reject(err);
        else resolve();
      },
    );
  });

  await new Promise((resolve, reject) => {
    client.run(
      `
      CREATE INDEX IF NOT EXISTS idx_state_city
      ON city_populations (state, city);
    `,
      err => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
};

exports.down = async client => {
  await new Promise((resolve, reject) => {
    client.run(`DROP INDEX IF EXISTS idx_state_city;`, err => {
      if (err) reject(err);
      else resolve();
    });
  });

  await new Promise((resolve, reject) => {
    client.run(`DROP TABLE IF EXISTS city_populations;`, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};
