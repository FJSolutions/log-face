import { createLogger, loggerDefaults } from "./index.ts";

//* Uncomment to disable all logging
// loggerDefaults.disableLogging = true;

//* A default logger
const logger = createLogger()
logger.debug(["Debug test"])
logger.debug(7)
logger.info({msg: "Info message"})
logger.warn({
   success: false,
   messages: {
      warn: "Warning message"
   }
})
logger.error("Error message!")

// An logger that is locally overridden to be error-only
const logger2 = createLogger({logLevel: "Error", category: "Overridden to log-level error"})
logger2.debug("Debug SHOULDN'T SHOW")
logger2.info("Info SHOULDN'T SHOW")
logger2.warn("Warn SHOULDN'T SHOW")
logger2.error("Error with a category")

//! THIS IS A BAD IDEA!
// loggerDefaults.logLevel = "Error"
//? Better to set hits in the `createLogger` function
loggerDefaults.category = "NJ1967"

//* A default logger
const logger3 = createLogger({logLevel: "Warning", category: "Default log level"})
logger3.debug(["Debug test with default category"])
logger3.warn(["Warning: test with default category"])

//* A logger with a category
const logger4 = createLogger({category: "ZCJ2001"})
logger4.info("Some Info")
logger4.error("A disaster!")

//* A logger that is switched off
const logger5 = createLogger({logLevel: "Off", category: "NONE"})
logger5.debug("Debug SHOULDN'T SHOW")
logger5.info("Info SHOULDN'T SHOW")
logger5.warn("Warn SHOULDN'T SHOW")
logger5.error("Error SHOULDN'T SHOW")