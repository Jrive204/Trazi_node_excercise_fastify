const fastify = require('fastify')({ logger: true });

fastify.register(require('./api-routes')); // Your routes

// Root Route
fastify.get('/api', async (request, reply) => {
  return { welcome: 'API router' };
});

module.exports = fastify;
