const express = require("express");
const { BarangList, BarangCreate, BarangDetail, BarangUpdate, BarangDelete } = require("./barang.controller");
const { IsAuthenticated } = require("../libs/lib.middleware");

const BarangRouter = express.Router();

BarangRouter.get('/', [IsAuthenticated], BarangList);
BarangRouter.post('/', [IsAuthenticated], BarangCreate);
BarangRouter.get('/:id', [IsAuthenticated], BarangDetail);
BarangRouter.put('/:id', [IsAuthenticated], BarangUpdate);
BarangRouter.delete('/:id', [IsAuthenticated], BarangDelete);

module.exports = {
  BarangRouter
}