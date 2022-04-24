const mongoose = require('mongoose');

const username = 'taufiqkalilika';
const password = 'passwordnyarahasia';
const server = '127.0.0.1:27017';
const authSource = 'admin';
const databaseName = 'latihan';

const connectionString = `mongodb://${username}:${password}@${server}/${databaseName}?authSource=${authSource}`;
console.log(connectionString);
const connectToMongoDB = async () => {
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('connected', () => {
      console.log('berhasil connect');
      return db;
    });

  } catch (error) {
    console.log(`errornya karena ${error}`);
    throw new Error(error);
  }
}

module.exports = {
  connect: connectToMongoDB
};



