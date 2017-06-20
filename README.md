# toppsy
Telemetry reporting plugin for hapi running with ContainerPilot


## Usage

Register the plugin with hapi, be sure to include the required `namespace` to store metrics inside Prometheus.

```js
server.register({
  register: Toppsy,
  options: { namespace: 'example' }
}, (err) => {}); // handle error if there is one
```

## Options

- `namespace` - inside of Prometheus every metric is reported under this namespace
- `interval` - number of milliseconds to wait between reporting metrics. Defaults to 1000


## Metrics

- `${namespace}_cpu_load_1min`
- `${namespace}_cpu_load_5min`
- `${namespace}_cpu_load_15min`
- `${namespace}_process_mem_rss`
- `${namespace}_process_heap_total`
- `${namespace}_process_heap_used`
- `${namespace}_process_mem_external`
- `${namespace}_process_event_delay`
- `${namespace}_process_up_time`
- `${namespace}_request_concurrent`
