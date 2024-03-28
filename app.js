const express = require("express");
const { BarangRouter } = require("./routers/barang.router");

const app = express();

app.use(express.json());

app.use('/barang', BarangRouter);

module.exports = {
  app
}