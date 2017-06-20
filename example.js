'use strict';

const Hapi = require('hapi');
const Toppsy = require('./');


const server = new Hapi.Server();
server.connection({ port: 8080 });
server.register({
  register: Toppsy,
  options: { namespace: 'example' }
}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  server.route({ method: 'get',
    path: '/',
    handler: (request, reply) => {
      reply('ok');
    }});

  server.start((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('server started at http://localhost:8080');
  });
});
