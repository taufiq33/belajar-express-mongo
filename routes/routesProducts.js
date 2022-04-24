const express = require('express');
const routers = express.Router();

const connection = require('../db/connection_mongo');
const ProductModel = require('../db/models/Products');

const DBConnection = connection.connect();

routers.get('/products', async (req, res) => {
  const products = await ProductModel.find();
  if (products.length > 0) {
    res.send({
      status: 'success',
      message: 'daftar produk berhasil ditemukan',
      data: products,
    })
  } else {
    res.send({
      status: 'success',
      message: 'daftar produk kosong',
      data: [],
    })
  }
})

module.exports = routers;