const db = require('../../../data/dbConfig');

function populationRoutes(fastify, options, done) {
  // GET
  fastify.get('/state/:state/city/:city', { caseSensitive: false }, (request, reply) => {
    const state = request.params.state.toLowerCase();
    const city = request.params.city.toLowerCase();

    db.get(
      'SELECT population FROM city_populations WHERE state = ? AND city = ?',
      [state, city],
      (error, row) => {
        if (error) {
          fastify.log.error(error);
          return reply.status(500).send({ error: 'Failed to retrieve data' });
        }

        if (!row) {
          return reply.status(404).send({ error: 'City not found in the specified state' });
        }

        reply.send({ population: row.population });
      },
    );
  });

  // PUT
  fastify.put('/state/:state/city/:city', async (request, reply) => {
    const state = request.params.state.toLowerCase();
    const city = request.params.city.toLowerCase();
    const population = parseInt(request.body, 10);
    console.log(city, state, '<== city,state');
    if (isNaN(population) || typeof population !== 'number') {
      return reply.status(400).send({
        error: 'Invalid population value just provide a number to update population',
      });
    }

    try {
      const result = await new Promise((resolve, reject) => {
        db.query(
          'UPDATE city_populations SET population = ? WHERE state = ? AND city = ?',
          [population, state, city],
          function (error) {
            if (error) {
              return reject(error);
            }
            resolve(this.changes);
          },
        );
      });

      // If rows were updated
      if (result > 0) {
        return reply.status(200).send({ message: 'Population updated successfully' });
      } else {
        // If no rows were updated, insert a new city
        await new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO city_populations (state, city, population) VALUES (?, ?, ?)',
            [state, city, population],
            error => {
              if (error) {
                return reject(error);
              }
              resolve(true);
            },
          );
        });
        return reply.status(201).send({ message: 'City and population added successfully' });
      }
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to update or insert data' });
    }
  });

  done();
}

module.exports = populationRoutes;
