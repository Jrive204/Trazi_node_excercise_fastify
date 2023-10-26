const db = require('../../../data/dbConfig');

async function populationRoutes(fastify, options) {
  // GET
  fastify.get('/state/:state/city/:city', { caseSensitive: false }, async (request, reply) => {
    const state = request.params.state.toLowerCase();
    const city = request.params.city.toLowerCase();
    try {
      const result = await db.query(
        'SELECT population FROM city_populations WHERE state = $1 AND city = $2',
        [state, city],
      );

      if (result.rowCount === 0) {
        return reply.status(404).send({ error: 'City not found in the specified state' });
      }

      return { population: result.rows[0].population };
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to retrieve data' });
    }
  });

  // PUT
  fastify.put('/state/:state/city/:city', async (request, reply) => {
    const state = request.params.state.toLowerCase();
    const city = request.params.city.toLowerCase();
    const population = parseInt(request.body, 10);

    if (isNaN(population) || typeof population !== 'number') {
      return reply
        .status(400)
        .send({ error: 'Invalid population value just provide a number to update population' });
    }

    try {
      // Begin the transaction
      await db.query('BEGIN');

      // First, attempt to update the city
      const updateResult = await db.query(
        'UPDATE city_populations SET population = $3 WHERE state = $1 AND city = $2',
        [state, city, population],
      );

      if (updateResult.rowCount > 0) {
        // Commit the transaction
        await db.query('COMMIT');
        return reply.status(200).send({ message: 'Population updated successfully' });
      }

      // If no rows were updated, then insert a new city
      await db.query('INSERT INTO city_populations (state, city, population) VALUES ($1, $2, $3)', [
        state,
        city,
        population,
      ]);

      // Commit the transaction
      await db.query('COMMIT');
      return reply.status(201).send({ message: 'City and population added successfully' });
    } catch (error) {
      // If there's an error, roll back the transaction
      await db.query('ROLLBACK');
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to update or insert data' });
    }
  });
}

module.exports = populationRoutes;
