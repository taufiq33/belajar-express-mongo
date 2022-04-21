const express = require('express');
const routers = express.Router();

const { ObjectId } = require('mongodb');

const client = require('../db/connection_mongo');
client.on('connectionReady', () => {
  console.log('berhasil terkoneksi');
});

routers.get('/pengguna', async (req, res) => {
  const db = client.db('latihan');
  const pengguna = await db.collection('pengguna').find().toArray();
  const response = {
    success: true,
    message: 'Berhasil mendapatkan data semua pengguna',
    data: pengguna
  };

  if (pengguna.length < 0) {
    response.success = false;
    response.message = 'Data Pengguna kosong'
  }

  res.json(response);
});

routers.get('/pengguna/:id', async (req, res) => {
  const db = client.db('latihan');

  const response = {
    success: true,
    message: 'Berhasil mendapatkan 1 data pengguna',
    data: null
  };

  try {
    const pengguna = await db.collection('pengguna').findOne({
      _id: ObjectId(req.params.id)
    });

    response.data = pengguna;

    if (!pengguna) {
      response.success = false;
      response.message = 'Data Pengguna tidak ditemukan'
    }
  } catch (error) {
    response.success = false;
    response.message = 'Data Pengguna tidak ditemukan'
  }

  res.json(response);
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