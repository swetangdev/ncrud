module.exports = {
    secret: 'topsecret',
    tokenExpireTime: 240,
    serverPort: 3000,
    //dbSource : 'cloud' => use this with 'cloudConnectionString', if database is from mongodb cloud
    //dbSource : 'mongodb' => use this with dbType, dbHost, dbHost, dbPort, dbName 
    dbSource: 'mongodb',
    cloudConnectionString: 'mongodb+srv://devgeek:devgeek@cluster0-edtxx.mongodb.net/test?retryWrites=true&w=majority',
    dbType: 'mongodb',
    dbHost: 'localhost',
    dbPort: 27017,
    dbName: 'admin',

};