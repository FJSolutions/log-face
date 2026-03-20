# log-face

`log-face` is a simple logging facade that provides a zero cost interface to the browser and `node.js` console.
It is structured with log levels and the logging of objects, and can be configured.

## TODO

- [x] Timestamp
- [x] Coerce types into an object
- [x] (Optional) Category/label
- [x] The Log-level must be able to be set to `off` globally
  - A `disableLogging` flac can be set to off to override all logging.
- [x] The logger's log-level should be set to the greater of the global and the instance
  - Errors should always be shown unless logging it off
  - Warnings if the level is warning or error, et cetera.
- [x] Document the file
- [ ] A getting started GitHub site
  - [ ] Create a logo
