const MongoClient = require('mongodb').MongoClient;

const username = 'taufiqkalilika';
const password = 'passwordnyarahasia';
const server = '127.0.0.1:27017';
const authSource = 'admin';

const connectionString = `mongodb://${username}:${password}@${server}?authSource=${authSource}`;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.error(error);
  } else {
    console.log(client);
    console.log("Server database Mongodb Berhasil terhubung.");
  }
});
