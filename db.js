var mongoose = require('mongoose');
const dbConstant = require('./utilities/constants/constant');
const config = require('./config');
const connectionString = config.dbSource === 'mongodb' ? config.dbType + '://' + config.dbHost + ':' + config.dbPort + '/' + config.dbName : config.cloudConnectionString;
const options = { autoIndex: false, useNewUrlParser: true };

// 'mongodb://localhost:27017/admin',
// mongoose.connect('mongodb+srv://devgeek:devgeek@cluster0-edtxx.mongodb.net/test?retryWrites=true&w=majority', config);
mongoose.connect(connectionString, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, dbConstant.db.connectErr));
db.once('open', () => {
  console.log(dbConstant.db.connected);
})
module.exports = db;