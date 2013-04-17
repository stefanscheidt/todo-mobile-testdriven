# todo-mobile-testdriven

## Description
Sample Application to demonstrate test-driven JavaScript UI Development, using [uitest.js](https://github.com/tigbro/uitest.js).

## Build
Directory structure

- app: The application
- test: The tests

Install the dependencies: `npm install`.

Build it: `./node_modules/.bin/grunt`

- set the right path to phantomjs before, e.g. `export PHANTOMJS_BIN=./node_modules/.bin/phantomjs`.

Start dev environment: `./node_modules/.bin/grunt dev`

* this will run the tests on every save
* this will serve the application under [http://localhost:9000/app](http://localhost:9000/app)
