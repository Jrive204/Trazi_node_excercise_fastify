require('dotenv').config();
const server = require('./api/server');

const port = process.env.PORT || 5555;

server.listen({ port: port, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
