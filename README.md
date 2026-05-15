# log-face

The name is a word-play on 'logging' and 'facade', `log-face`. It is a zero-cost logging facade to the browser's `console.log` that provides structured output and coloured log-level labels.

## Features

- Structured log output — every message is wrapped with a timestamp and optional category
- Coloured, labelled log levels in the browser console
- Per-logger log level configuration
- Global override to disable, restore, or force a specific log level at runtime
- Optional category tag for filtering output by module or feature
- Full TypeScript support

## Getting Started

```ts
import { createLogger } from "log-face";

const logger = createLogger()

logger.debug("Starting up")
logger.info("Server ready")
logger.warn("Config value missing, using default")
logger.error(new Error("Something went wrong"))
```

Each call produces a structured object in the console, labelled and coloured by level:

```
[debug]: { level: "Debug", message: { message: "Starting up", time: 1715000000000 } }
```

## Configuration

Pass an object to `createLogger` to override the defaults, or pass a string as a shorthand for setting the `category`:

```ts
const logger = createLogger({ logLevel: "Warn", category: "payments" })

// Shorthand — equivalent to { category: "auth" }
const authLogger = createLogger("auth")
```

### Default Configuration

| Property       | Default           | Description                                               |
|----------------|-------------------|-----------------------------------------------------------|
| `logLevel`     | `'Debug'`         | Minimum level to log. Messages below this level are silent |
| `category`     | `undefined`       | Optional tag to identify the source of log messages       |
| `debugColor`   | `cornflowerblue`  | CSS colour for Debug labels in the console                |
| `infoColor`    | `darkseagreen`    | CSS colour for Info labels                                |
| `warnColor`    | `darkorange`      | CSS colour for Warning labels                             |
| `errorColor`   | `crimson`         | CSS colour for Error labels                               |

## Log Levels

Log levels control the verbosity of a logger. Each logger only outputs messages at or above its configured level.

| Level   | When to use                                        |
|---------|----------------------------------------------------|
| `Debug` | Detailed diagnostic information (most verbose)     |
| `Info`  | General operational messages                       |
| `Warn`  | Something unexpected but non-fatal                 |
| `Error` | A failure that needs attention                     |
| `Off`   | Silences the logger entirely                       |

```ts
const logger = createLogger({ logLevel: "Warn" })

logger.debug("ignored")  // silent — below Warn
logger.info("ignored")   // silent — below Warn
logger.warn("visible")   // logged
logger.error("visible")  // logged
```

The level applied to a logger is the **greater** of the global default (`loggerDefaults.logLevel`) and the instance's own `logLevel`. This ensures that a more restrictive global setting is always respected.

## Categories

A `category` tags a logger with a label that appears in every message it produces. Use it to identify the source module or feature area:

```ts
const logger = createLogger({ category: "checkout" })

logger.info("Order placed")
// { level: "Info", message: { message: "Order placed", time: ..., category: "checkout" } }
```

Categories become especially useful with the global override — see [Filtering by category](#filtering-by-category) below.

## Structured Messages

The `message` argument to each logging method accepts any value. The logger wraps it with metadata automatically:

```ts
logger.debug({ userId: 42, action: "login" })
// { level: "Debug", message: { message: { userId: 42, action: "login" }, time: 1715000000000 } }
```

Arrays, functions, `undefined`, and primitives are all handled:

```ts
logger.debug(["one", "two"])          // message: ["one", "two"]
logger.debug(undefined)               // message: "undefined"
logger.debug(function myFn() {})      // message: "Function: myFn"
```

## Global Logging Override

`setLoggingOverride` controls logging for all loggers at runtime, regardless of when each logger was created. It accepts one of three states:

### 1. Disable all logging

```ts
import { setLoggingOverride } from "log-face"

setLoggingOverride('disabled')

logger.debug("ignored")   // silent
logger.error("ignored")   // silent — everything is suppressed
```

Useful in production builds or when you want a hard kill-switch.

### 2. Normal (per-logger config)

```ts
setLoggingOverride('normal')
```

Restores the default behaviour — each logger uses its own configured `logLevel`. This is the default state.

### 3. Global level override

Force all loggers to a specific level, overriding their individual configuration:

```ts
setLoggingOverride({ level: "Error" })

const verboseLogger = createLogger({ logLevel: "Debug" })

verboseLogger.debug("ignored")   // silent — overridden to Error
verboseLogger.warn("ignored")    // silent
verboseLogger.error("visible")   // logged
```

#### Filtering by category

Add a `category` to the override to restrict logging to loggers tagged with that category. All other loggers are suppressed:

```ts
const apiLogger = createLogger({ category: "api" })
const uiLogger  = createLogger({ category: "ui" })
const misc      = createLogger()

setLoggingOverride({ level: "Debug", category: "api" })

apiLogger.debug("request received")  // logged — matches the filter
uiLogger.info("button clicked")      // silent — wrong category
misc.warn("something happened")      // silent — no category
```

This is useful for debugging a specific module without noise from the rest of the application.

### Switching states at runtime

The override takes effect immediately on all existing loggers — there is no need to recreate them:

```ts
const logger = createLogger()

setLoggingOverride('disabled')
logger.debug("silent")

setLoggingOverride('normal')
logger.debug("visible again")
```

## TypeScript

All types are exported:

```ts
import type { LogLevel, LoggingOverride, LoggerConfig, LogFace } from "log-face"
```

`LoggingOverride` is a discriminated union:

```ts
type LoggingOverride =
  | 'disabled'
  | 'normal'
  | { level: Exclude<LogLevel, 'Off'>; category?: string }
```

## Advanced: `loggerDefaults`

The `loggerDefaults` object is exported for direct mutation and is useful for configuring shared defaults before any loggers are created — for example, in test setup:

```ts
import { loggerDefaults } from "log-face"

loggerDefaults.logLevel = "Error"   // raise the global baseline level
loggerDefaults.disableLogging = true // legacy kill-switch (prefer setLoggingOverride)
```

> For runtime control, prefer `setLoggingOverride` over mutating `loggerDefaults.disableLogging` directly.
