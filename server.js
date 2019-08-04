const http = require('http');
const db = require('./db');
const app = require('./app');

const server = http.createServer(app).listen(3000, function() {
    console.log('Listening 3000');
})