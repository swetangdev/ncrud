const http = require('http');
const app = require('./app');
const config = require('./config');
const constant = require('./utilities/constants/constant');

const server = http.createServer(app).on('error', err => console.log(err));
server.listen(config.serverPort, function () { console.log(constant.server.serverListen + config.serverPort); });