const client = require('./db/connection_mongo');
client.on('connectionReady', () => {
  console.log('berhasil terkoneksi');
})
