require('env2')('.env');    // loads all entries into process.env

var mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_COL}`;
console.log(mongoDB); // "127.0.0.1"