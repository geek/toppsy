# toppsy
Telemetry reporting plugin for hapi running with ContainerPilot


## Usage

Register the plugin with hapi, be sure to include the required `namespace` and `subsystem` to store metrics inside Prometheus.

```js
server.register({
  register: Toppsy,
  options: { namespace: 'example', subsystem: 'server' }
}, (err) => {}); // handle error if there is one
```

## Options

- `namespace` - inside of Prometheus every metric is reported under this namespace
- `subsystem` - inside of Prometheus the sub-category/subsystem where metrics are located
- `interval` - number of milliseconds to wait between reporting metrics. Defaults to 1000


## Metrics

- `cpu_load_1min`
- `cpu_load_5min`
- `cpu_load_15min`
- `process_mem_rss`
- `process_heap_total`
- `process_heap_used`
- `process_mem_external`
- `process_event_delay`
- `process_up_time`
- `requests_concurrent`
