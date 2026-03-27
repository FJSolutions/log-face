import { describe, it, expect, beforeEach } from "vitest"
import { createLogger, loggerDefaults } from "../src";

describe("log-face", () => {
   beforeEach(() => {
      // Reset defaults for test isolation
      loggerDefaults.isTesting = true
      loggerDefaults.disableLogging = false
      loggerDefaults.logLevel = "Debug"
   })

   it("should log a message at the Debug level", () => {
      const logger = createLogger()
      const result = logger.debug("Testing")
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "Testing"
         }
      })
   })

   it("should log a message at the Debug level with a category", () => {
      const logger = createLogger({category: "NJ1967"})
      const result = logger.debug("Testing")
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "Testing",
            category: "NJ1967"
         }
      })
   })

   it("should log a message at the Debug level with a category using the string argument of createLogger", () => {
      const logger = createLogger("FBJ1965")
      const result = logger.debug("Testing")
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "Testing",
            category: "FBJ1965"
         }
      })
   })

   it("should not log a message when the global disableLogging flag is true", () => {
      loggerDefaults.disableLogging = true
      const logger = createLogger()
      const result = logger.debug("Testing")
      expect(result).toBeUndefined()
   })

   it("should log an Debug message", () => {
      const logger = createLogger()
      const result = logger.debug("Debug Message")
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "Debug Message"
         }
      })
   })

   it("should log an Debug message with array payload", () => {
      const logger = createLogger()
      const arr = ["One", "Two"]
      const result = logger.debug(arr)
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: arr
         }
      })
   })

   it("should log an Debug message with an undefined payload", () => {
      const logger = createLogger()
      //@ts-ignore
      const result = logger.debug()
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "undefined"
         }
      })
   })

   it("should log an Debug message with a funciton payload", () => {
      const logger = createLogger()
      const f = () => {
      }
      const result = logger.debug(f)
      expect(result).toEqual({
         level: "Debug",
         message: {
            time: expect.any(Number),
            message: "Function: f"
         }
      })
   })

   it("should log an Info message", () => {
      const logger = createLogger()
      const result = logger.info("Info Message")
      expect(result).toEqual({
         level: "Info",
         message: {
            time: expect.any(Number),
            message: "Info Message"
         }
      })
   })

   it("should log an Warn message", () => {
      const logger = createLogger()
      const result = logger.warn("Warn Message")
      expect(result).toEqual({
         level: "Warn",
         message: {
            time: expect.any(Number),
            message: "Warn Message"
         }
      })
   })

   it("should log a warn message", () => {
      const logger = createLogger()
      const result = logger.warn("Warning Message")
      expect(result).toEqual({
         level: "Warn",
         message: {
            time: expect.any(Number),
            message: "Warning Message"
         }
      })
   })

   it("should log an error message", () => {
      const logger = createLogger()
      const error = new Error("Test Error")
      const result = logger.error(error)
      expect(result).toEqual({
         level: "Error",
         message: {
            time: expect.any(Number),
            message: error
         }
      })
   })

   it("should not log a debug message at the Info level", () => {
      const logger = createLogger({logLevel: "Info"})
      const result = logger.debug("Testing")
      expect(result).toBeUndefined()
   })

   it("should not log an Info message when the global logLevel message at the Warn level", () => {
      const logger = createLogger({logLevel: "Warn"})
      const result = logger.info("Testing")
      expect(result).toBeUndefined()
   })

   it("should not log an Warn message when the global logLevel message at the Error level", () => {
      const logger = createLogger({logLevel: "Error"})
      const result = logger.warn("Testing")
      expect(result).toBeUndefined()
   })

   it("should not log an Error message when the global logLevel message at the Off level", () => {
      const logger = createLogger({logLevel: "Off"})
      const result = logger.error("Testing")
      expect(result).toBeUndefined()
   })
})
