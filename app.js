const express = require("express");
const { BarangRouter } = require("./barang/barang.router");
const { ROUTER_BASE_BARANG } = require("./barang/barang.config");

const app = express();

app.use(express.json());

app.use(ROUTER_BASE_BARANG, BarangRouter);

module.exports = {
  app
}