const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field Nama harus diisi'],
    minlength: 3,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: [true, 'Field Harga harus diisi'],
    min: 100,
  },
  stock: {
    type: Number
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Products = mongoose.model('Product', ProductsSchema);

module.exports = Products;