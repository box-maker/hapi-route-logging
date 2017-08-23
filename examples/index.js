const Hapi = require('hapi');
const hapiRouteLogging = require('../lib/index');

const server = new Hapi.Server();

server.connection({
  port: 3000, host: 'localhost'
});

server.register([{
  register: hapiRouteLogging
}], err => {
  if (err) {
    console.error(err);
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/route1',
    handler(request, reply) {
      reply('Testing route1');
    }
  });
  server.route({
    method: 'GET',
    path: '/route2',
    handler(request, reply) {
      reply('Testing route2');
    }
  });

  server.start(err => {
    if (err) {
      throw err;
    }
  });
});
