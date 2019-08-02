var mongoose = require('mongoose');
const config = {
  autoIndex: false,
  useNewUrlParser: true,
};
// mongoose.connect('mongodb+srv://devgeek:devgeek@cluster0-edtxx.mongodb.net/test?retryWrites=true&w=majority', config);
mongoose.connect('mongodb://localhost:27017/admin', config);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected');
})
module.exports = db;