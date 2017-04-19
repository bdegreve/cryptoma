# Cryptoma

[![Website](https://img.shields.io/website/https/cryptoma.bramz.net.svg)](https://cryptoma.bramz.net/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-blue.svg)](http://standardjs.com/)

This tool was created for the purpose of enciphering parts of the route description of [Joepie 27](http://www.joepie27.be/), tocht C.

## Website

A live version of Cryptoma can be accessed at [cryptoma.bramz.net](https://cryptoma.bramz.net/).

## License

ISC, see [LICENSE](./LICENSE) file.

## Requirements

  - Node.js (v6.x LTS recommended) and NPM (v3.x recommended). Various download
    options are available at [nodejs.org](https://nodejs.org/en/download/),
    including instructions using [package managers](https://nodejs.org/en/download/package-manager/).
  - Optional: [Yarn](https://yarnpkg.com/en/docs/install) to install the dependencies.
  - Optional: `make`

## How to build

  - Install dependencies:
    ```
    npm install
    ```
    Or, if you have Yarn:
    ```
    yarn install
    ```
  - Run development server at [localhost:8080](http://localhost:8080):
    ```
    npm start
    ```
  - If you've chanced source code, update locale files (in `app/locales`):
    ```
    npm run translations
    ```
  - Run tests
    ```
    npm test
    ```
  - Make production build (in `dist`):
    ```
    npm run dist
    ```

### Using `make`

  - Run development server at [localhost:8080](http://localhost:8080):
    ```
    make run
    ```
  - If you've chanced source code, update locale files (in `app/locales`):
    ```
    make translations
    ```
  - Run tests
    ```
    make check
    ```
  - Make production build (in `dist`):
    ```
    make
    ```
  - Clean up build
    ```
    make clean
    ```
  - Clean up everything (including dependencies)
    ```
    make distclean
    ```