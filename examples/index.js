const Hapi = require('hapi');
const hapiRouteLogging = require('../lib/index');

const server = new Hapi.Server();

const web = server.connection({
  host: 'localhost',
  port: 3000,
  labels: ['web']
});

const admin = server.connection({
  host: 'localhost',
  port: 3030,
  labels: ['admin']
});

web.register([{
  register: hapiRouteLogging,
  options: {
    showRoutes: true,
    showRoutesList: true,
    checkUpgrade: true
  }
}], err => {
  if (err) {
    console.error(err);
    throw err;
  }

  web.route({
    method: 'GET',
    path: '/route1',
    handler(request, reply) {
      reply('Testing route1');
    }
  });
  web.route({
    method: 'GET',
    path: '/route2',
    handler(request, reply) {
      reply('Testing route2');
    }
  });
});

admin.register([{
  register: hapiRouteLogging,
  options: {
    showRoutes: true,
    showRoutesList: true,
    checkUpgrade: false
  }
}], err => {
  if (err) {
    console.error(err);
    throw err;
  }

  admin.route({
    method: 'GET',
    path: '/book/{id}',
    config: {
      description: 'Get book by ID'
    },
    handler(request, reply) {
      reply('Get book');
    }
  });
});

server.start(err => {
  if (err) {
    throw err;
  }
});
