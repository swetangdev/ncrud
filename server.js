var http = require('http'),
    db = require('./db'),
    app = require('./app');

const server = http.createServer(app).listen(3000, function() {
    console.log('Listening 3000');
    
})