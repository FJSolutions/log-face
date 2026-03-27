/**
 * The levels (of detail) that can be logged
 */
export type LogLevel =
   | "Debug"
   | "Info"
   | "Warning"
   | "Error"
   /** Logging is off for the logger */
   | "Off"

/**
 * The public interface for configuring logging
 */
export interface LoggerConfig {
   /**
    * The default level to generate log messages for
    */
   logLevel: LogLevel,
   /**
    * The colour of the Debug message label
    */
   debugColor: string
   /**
    * The colour of the Info message label
    */
   infoColor: string
   /**
    * The colour of the Warning message label
    */
   warnColor: string
   /**
    * The colour of the Error message label
    */
   errorColor: string
   /**
    * Globally disables logging
    */
   disableLogging: boolean
   /**
    * A category label for the logger
    */
   category?: string
}

/**
 * The default configuration for the logger
 */
export const loggerDefaults: LoggerConfig = {
   logLevel: "Debug",
   debugColor: "cornflowerblue",
   infoColor: "darkseagreen",
   warnColor: "darkorange",
   errorColor: "crimson",
   disableLogging: false,
}

/**
 * The public interface for the logger
 */
export interface LogFace {
   /**
    * Writes a Debug message to the console;
    * if logging has not been disabled and the `logLevel` is set to at least Debug
    * @param message Any kind of object that will be merged with the built-in logging properties
    */
   debug: (message: any) => void
   /**
    * Writes an Info message to the console;
    * if logging has not been disabled and the `logLevel` is set to Info or lower
    * @param message Any kind of object that will be merged with the built-in logging properties
    */
   info: (message: any) => void
   /**
    * Writes a Warning message to the console;
    * if logging has not been disabled and the `logLevel` is set to Warn or lower
    * @param message Any kind of object that will be merged with the built-in logging properties
    */
   warn: (message: any) => void
   /**
    * Writes an Error message to the console;
    * if logging has not been disabled and the `logLevel` is set to at Error or lower
    * @param message Any kind of object that will be merged with the built-in logging properties
    */
   error: (message: any) => void
}

const DEBUG_LEVEL = 100
const INFO_LEVEL = 300
const WARN_LEVEL = 400
const ERROR_LEVEL = 500
const OFF_LEVEL = 1000

const logLevelToNumber = (logLevel: LogLevel): number => {
   switch (logLevel) {
      case "Debug":
         return DEBUG_LEVEL
      case"Info":
         return INFO_LEVEL
      case "Warning":
         return WARN_LEVEL
      case "Error":
         return ERROR_LEVEL
      case "Off":
         return OFF_LEVEL
      default:
         return -1
   }
}

const makeStructuredLogMessage = (message: any, optionalCategory?: string): any => {
   const time = Date.now()
   const category = optionalCategory ? {category: optionalCategory} : {}

   const msgType = typeof message
   if (Array.isArray(message)) {
      return Object.assign({
         message,
         time,
      }, category)
   }
   if (msgType === "undefined") {
      return Object.assign({
         message: "undefined",
         time,
      }, category)
   }
   if (msgType === "function") {
      return Object.assign({
         message: `Function: ${message.name}`,
         time,
      }, category)
   }

   return Object.assign({
      message,
      time,
   }, category)
}

class ConsoleLogger implements LogFace {
   private readonly _logLevel: number
   private readonly _config: LoggerConfig

   constructor(config: LoggerConfig) {
      this._config = config
      this._logLevel = logLevelToNumber(loggerDefaults.logLevel)
      const overriddenLogLevel = logLevelToNumber(config.logLevel)
      if (overriddenLogLevel > this._logLevel)
         this._logLevel = overriddenLogLevel
   }

   debug(message: any): void {
      if (!this._config.disableLogging && this._logLevel <= DEBUG_LEVEL)
         console.log("%c[DEBUG]: %o", `color: ${this._config.debugColor}; font-weight: bold;`, makeStructuredLogMessage(message, this._config.category))
   }

   info(message: any): void {
      if (!this._config.disableLogging && this._logLevel <= INFO_LEVEL)
         console.log("%c[INFO]: %o", `color: ${this._config.infoColor}; font-weight: bold;`, makeStructuredLogMessage(message, this._config.category))
   }

   warn(message: any): void {
      if (!this._config.disableLogging && this._logLevel <= WARN_LEVEL)
         console.log("%c[WARN]: %o", `color: ${this._config.warnColor}; font-weight: bold;`, makeStructuredLogMessage(message, this._config.category))
   }

   error(error: Error): void {
      if (!this._config.disableLogging && this._logLevel <= ERROR_LEVEL)
         console.log("%c[ERROR]: %o", `color: ${this._config.errorColor}; font-weight: bold;`, makeStructuredLogMessage(error, this._config.category))
   }
}

type OptionalLoggerConfig = Partial<LoggerConfig>;
type Params = OptionalLoggerConfig | string;

/**
 * Creates a new structured logger based on the browser's console, with the given configuration
* @param config (Optional) Either an object that overrides the default configuration or a `string` which will be used as the `category` property
 */
 export const createLogger = (config?: Params): LogFace => {
   	let cfg: OptionalLoggerConfig = {};
   	if (config) {
		if (typeof config === "string") {
			cfg = { category: config };
	   	} else {
	   		cfg = config;
	   	}
   }
	const _config = Object.assign({}, loggerDefaults, cfg);

   if (logLevelToNumber(_config.logLevel) < 0) {
      throw new Error('Invalid log level, must be one of "Debug", "Info", "Warning", "Error", or "Off"')
   }

   return new ConsoleLogger(_config);
}
