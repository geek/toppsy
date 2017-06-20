'use strict';

const Assert = require('assert');
const Oppsy = require('oppsy');
const Putmetric = require('putmetric');
const Package = require('../package.json');


const internals = {};

module.exports = function (server, options, next) {
  Assert(options.namespace, 'namespace option is required');


  const oppsy = new Oppsy(server);
  oppsy.on('ops', internals.onData(options.namespace));

  server.once('start', () => {
    oppsy.start(options.interval || 1000);
  });

  next();
};


module.exports.attributes = {
  pkg: Package
};


internals.onData = function (namespace) {
  const putCpu = new Putmetric({ namespace, subsystem: 'cpu' });
  const putProcess = new Putmetric({ namespace, subsystem: 'process' });
  const putRequest = new Putmetric({ namespace, subsystem: 'request' });

  return function (data) {
    putCpu('load_1min', data.osload[0]);
    putCpu('load_5min', data.osload[1]);
    putCpu('load_15min', data.osload[2]);

    putProcess('mem_rss', data.psmem.rss);
    putProcess('heap_total', data.psmem.heapTotal);
    putProcess('heap_used', data.psmem.heapUsed);
    putProcess('mem_external', data.psmem['external']);

    putProcess('event_delay', data.psdelay);

    putProcess('up_time', data.psup);

    let concurrents = 0;
    Object.keys(data.concurrents).forEach((key) => {
      concurrents += data.concurrents[key];
    });

    putRequest('concurrent', concurrents);
  };
};
