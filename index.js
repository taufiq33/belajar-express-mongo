const express = require('express');
const routers = require('./routes/routes');

const app = express();
const port = 7676;

app.use(express.json());
app.use(express.urlencoded());
app.use(routers);

app.listen(port, (() => {
  console.log('Server berjalan');
}))
