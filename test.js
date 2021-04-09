const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, { PORT: 5000 });
const child = spawn('node', ['index.js'], { env });

test('responds to requests', (t) => {
    t.plan(4);

    // Wait until the server is ready
    child.stdout.on('data', _ => {
        // Make a request to our app
        (async() => {
            const response = await got('http://127.0.0.1:5000');
            // stop the server
            child.kill();
            // No error
            t.false(response.error);
            // Successful response
            t.equal(response.statusCode, 200);
            // Assert content checks
            t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
            t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
        })();
    });
});

// {
//   "name": "node-js-getting-started",
//   "version": "0.3.0",
//   "description": "A sample Node.js app using Express 4",
//   "engines": {
//       "node": "14.0.6"
//   },
//   "main": "app.js",
//   "scripts": {
//       "start": "node app.js",
//       "test": "node test.js"
//   },
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//       "cool-ascii-faces": "^1.3.4",
//       "ejs": "^3.1.5",
//       "express": "^4.15.2",
//       "got": "^11.3.0",
//       "tape": "^4.7.0"
//   }
// }