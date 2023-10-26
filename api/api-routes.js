async function routes(fastify, options) {
  fastify.register(require('./routes/population/population-route'), { prefix: '/api/population' });
}

module.exports = routes;
