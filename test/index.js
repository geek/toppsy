'use strict';

const Hapi = require('hapi');
const Lab = require('lab');
const Toppsy = require('../');


const lab = exports.lab = Lab.script();
const it = lab.it;
const expect = Lab.expect;


it('can be registered with hapi', (done) => {
  const server = new Hapi.Server();
  server.connection();
  server.register({
    register: Toppsy,
    options: { namespace: 'example', subsystem: 'server' }
  }, (err) => {
    expect(err).to.not.exist();
    done();
  });
});
