const express = require('express');
const routers = express.Router();

routers.get('/home', (req, res) => {
  res.json({
    'msg': 'success',
  })
})

module.exports = routers;