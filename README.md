## Installation

```bash
$ npm install
```

## Running the app

Firstly, make sure you have `.env` file created and configured correctly. You can find example config in `.env.example`.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
