const mongoose = require('mongoose');

const username = 'taufiqkalilika';
const password = 'passwordnyarahasia';
const server = '127.0.0.1:27017';
const authSource = 'admin';
const databaseName = 'latihan';

const connectionString = `mongodb://${username}:${password}@${server}/${databaseName}?authSource=${authSource}`;

const connectToMongoDb = async () => {
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('connected', () => {
      console.log('berhasil connect ke DB');
      return db;
    })
  } catch (error) {
    console.error(`errornya karena ${error}`);
    throw new Error(error);
  }
}

module.exports = {
  connect: connectToMongoDb
};