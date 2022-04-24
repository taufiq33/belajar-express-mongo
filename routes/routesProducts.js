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
      status: 'failed',
      message: 'daftar produk kosong',
      data: [],
    })
  }
});

routers.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const singleProduct = await ProductModel.findOne({
    "_id": id,
  });
  if (singleProduct) {
    res.send({
      status: 'success',
      message: `1 produk dg id ${id} berhasil ditemukan`,
      data: singleProduct,
    });
  } else {
    res.send({
      status: 'failed',
      message: `1 produk dg id ${id} tidak ditemukan`,
      data: {},
    });
  }
});

routers.post('/products', async (req, res) => {
  const { name, price, stock, status } = req.body;
  const newProductObject = {
    name, price, stock,
    status: status === undefined ? true : status
  }
  const insertNewProduct = await ProductModel.create(newProductObject);

  if (insertNewProduct) {
    res.send({
      status: 'success',
      message: 'Berhasil menambah produk',
      data: insertNewProduct
    });
  } else {
    res.send({
      status: 'failed',
      message: 'Gagal menambah produk',
      data: {}
    });
  }
});

module.exports = routers;