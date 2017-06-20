'use strict';

const Assert = require('assert');
const Oppsy = require('oppsy');
const Putmetric = require('putmetric');
const Package = require('../package.json');


const internals = {};

module.exports = function (server, options, next) {
  Assert(options.namespace, 'namespace option is required');
  Assert(options.subsystem, 'subsystem option is required');

  const putmetric = new Putmetric({ namespace: options.namespace, subsystem: options.subsystem });
  const oppsy = new Oppsy(server);
  oppsy.on('ops', internals.onData(putmetric));

  server.once('start', () => {
    oppsy.start(options.interval || 1000);
  });

  next();
};


module.exports.attributes = {
  pkg: Package
};


internals.onData = function (putmetric) {
  return function (data) {
    putmetric('cpu_load_1min', data.osload[0]);
    putmetric('cpu_load_5min', data.osload[1]);
    putmetric('cpu_load_15min', data.osload[2]);

    putmetric('process_mem_rss', data.psmem.rss);
    putmetric('process_heap_total', data.psmem.heapTotal);
    putmetric('process_heap_used', data.psmem.heapUsed);
    putmetric('process_mem_external', data.psmem['external']);

    putmetric('process_event_delay', data.psdelay);

    putmetric('process_up_time', data.psup);

    let concurrents = 0;
    Object.keys(data.concurrents).forEach((key) => {
      concurrents += data.concurrents[key];
    });

    putmetric('requests_concurrent', concurrents);
  };
};
