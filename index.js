const express = require('express');
const routers = require('./routes/routesProducts');

const app = express();
const port = 7676;

app.use(express.json());
app.use(routers);

app.listen(port, (() => {
  console.log('Server berjalan');
}))
