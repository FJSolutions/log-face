# log-face

The name is a word-play on 'logging' and 'facade', `log-face`. It is a zero-cost logging facade to the browser's `console.log` that provides a structured output and includes coloured log-level labels.

## Features

- [x] Timestamp
- [x] Coerce types into an object
- [x] (Optional) Category/label
- [x] The Log-level must be able to be set to `off` globally
  - A `disableLogging` flac can be set to off to override all logging.
- [x] The logger's log-level should be set to the greater of the global and the instance
  - Errors should always be shown unless logging it off
  - Warnings if the level is warning or error, et cetera.

## Getting Started

The simplest use-case is to create a logger and use its logging methods.

```js
  import { createLogger } from "log-face";
  // Other code
  const logger = createLogger()
  // Other code
  logger.debug("A debug message to see this message")
```

This uses the default configuration which is as follows (see more below):

### Default Configuration

| Property | Default | Description |
|----------|---------|-------------|
| logLevel | 'Debug' | The default logging level is 'Debug' meaning everything |
| disableLogging | `false` | Whether to disable all logging |
| category | `undefined` | An optional `string` to identify or filter log messages by |
| debugColor | `cornflowerblue` | A CSS colour definition for Debug messages |
| infoColor | `darkseagreen` | A CSS colour definition for Info messages |
| warnColor | `darkorange` | A CSS colour definition for Warning messages |
| errorColor | `crimson` | A CSS colour definition for Error messages |

- TypeScript support
- A more complex example with a `category`.
- Another example with the `logLevel` changed, and why you can leave it and it has a zero-cost.
- Setting the `disableLogging` flag when you're done.
- Structured logging output

### Structured Logging

- The `message` parameter to each of the logging methods has type `any` so that you can pass any kind of simple or structured data to the logger.
- The logger itself will merge its own `time` property into an object and merge whatever you send to it as the `message` property that is actually logged.
- Advantages of this.

### Enabling and Disabling Logging

- Log levels.
  - How they override one another.
- Disabling all logging.

### Configuring Logging

- The `loggerDefaults` object and what the properties control.
