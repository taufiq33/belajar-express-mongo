const express = require('express');
const routers = express.Router();

const client = require('../db/connection_mongo');
client.on('connectionReady', () => {
  console.log('berhasil terkoneksi');
});

routers.get('/pengguna', async (req, res) => {
  const db = client.db('latihan');
  const products = await db.collection('pengguna').find().toArray();
  const response = {
    success: true,
    message: 'Berhasil mendapatkan data semua pengguna',
    data: products
  };

  if (products.length < 0) {
    response.success = false;
    response.message = 'Data Pengguna kosong'
  }

  res.json(response);
});

routers.get('/pengguna/:id', (req, res) => {
  res.send(`menampilkan pengguna ber id ${req.params.id}`);
});

routers.post('/pengguna', (req, res) => {
  const { nama } = req.body;
  console.log(req.body);
  res.send(`data yg anda kirim nama : ${nama}`);
});

routers.delete('/pengguna/:id', (req, res) => {
  res.send(`menghapus pengguna ber id ${req.params.id}`);
});

routers.put('/pengguna/:id', (req, res) => {
  res.send(`Mengedit pengguna ber id ${req.params.id}`);
});

module.exports = routers;