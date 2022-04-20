const { MongoClient } = require('mongodb');

const username = 'taufiqkalilika';
const password = 'passwordnyarahasia';
const server = '127.0.0.1:27017';
const authSource = 'admin';

const connectionString = `mongodb://${username}:${password}@${server}?authSource=${authSource}`;

const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
})();

module.exports = client;