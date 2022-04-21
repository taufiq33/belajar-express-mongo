const express = require('express');
const routers = express.Router();

const { ObjectId } = require('mongodb');

const client = require('../db/connection_mongo');
client.on('connectionReady', () => {
  console.log('berhasil terkoneksi');
});

const isSet = (data) => {
  if (data === undefined) return false;
  if (data === null) return false;
  return true;
}

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

routers.post('/pengguna', async (req, res) => {
  const { nama, umur, menikah, anak } = req.body;

  const db = client.db('latihan');

  const response = {
    success: true,
    message: `Berhasil Input 1 pengguna ${nama}`,
    data: req.body
  };



  if (Object.keys(req.body).length < 4) {
    response.success = false;
    response.message = 'Data Pengguna gagal ditambahkan';
  }
  else {
    try {
      const inputPengguna = await db.collection('pengguna').insertOne({
        "nama": nama,
        "umur": umur,
        "menikah": menikah,
        "anak": anak
      });

      console.log("yang terinput", inputPengguna.insertedId);

      if (!inputPengguna.insertedId) {
        response.success = false;
        response.message = 'Data Pengguna gagal ditambahkan'
      }
    } catch (error) {
      response.success = false;
      response.message = 'Data Pengguna gagal ditambahkan'
    }
  }

  res.json(response);
});

routers.delete('/pengguna/:id', async (req, res) => {
  const id = req.params.id;

  const db = client.db('latihan');

  const response = {
    success: true,
    message: `Berhasil hapus 1 pengguna ${id}`,
    data: req.body
  };

  try {
    const deletePengguna = await db.collection('pengguna').deleteOne(
      { _id: ObjectId(id) }
    );

    console.log("yang terdelete ", deletePengguna.deletedCount);

    if (deletePengguna.deletedCount < 1) {
      response.success = false;
      response.message = 'Data Pengguna gagal di delete';
    }
  } catch (error) {
    response.success = false;
    response.message = 'Data Pengguna gagal di delete';
  }

  res.json(response);
});

routers.put('/pengguna/:id', async (req, res) => {
  const keys = ['nama', 'umur', 'menikah', 'anak'];
  const id = req.params.id;

  const db = client.db('latihan');

  const response = {
    success: true,
    message: `Berhasil Edit 1 pengguna ${id}`,
    data: req.body
  };

  const checkInputUserKeys = () => {
    let returnValue = true;
    Object.keys(req.body).forEach(item => {
      if (!keys.includes(item)) {
        returnValue = false;
      }
    })
    return returnValue;
  }


  if (Object.keys(req.body).length < 1) {
    response.success = false;
    response.message = 'Data Pengguna gagal di edit';
  } else if (!id) {
    response.success = false;
    response.message = 'Data Pengguna gagal di edit';
  } else if (!checkInputUserKeys()) {
    response.success = false;
    response.message = 'Data Pengguna gagal di edit';
  }
  else {
    // const dataObjectToUpdate = {};

    // Object.keys(req.body).forEach((item) => {
    //   dataObjectToUpdate[item] = req.body[item];
    // });

    try {
      const editPengguna = await db.collection('pengguna').updateOne(
        { _id: ObjectId(id) },
        { $set: req.body }
      );

      console.log("yang teredit ", editPengguna.matchedCount);

      if (editPengguna.matchedCount < 1) {
        response.success = false;
        response.message = 'Data Pengguna gagal di edit';
      }
    } catch (error) {
      response.success = false;
      response.message = 'Data Pengguna gagal di edit';
    }
  }

  res.json(response);
});

module.exports = routers;