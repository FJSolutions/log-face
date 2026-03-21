# Changelog

All notable changes to `log-face` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-03-21

Initial release.

### Added

- The main `log-face.ts` file that the `index.ts` simply exports.
  - All current functionality is in the `log-face.ts` file.
  - Currently the scope of the project is to add a coloured label to every log entry with a timestamp and a message, which can be an object.
- A build system for the library which outputs JavaScript and a `.d.ts` file tothe same `/dist` folder.
- `README.md` and this `CHANGELOG.md` for documentation.
