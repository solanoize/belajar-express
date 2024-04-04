const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { OrderCreate, OrderDetail, OrderList } = require("./order.controller");
const { OrderNomorValidator, OrderTanggalValidator, OrderCustomerValidator, OrderDibayarValidator, OrderTotalValidator, OrderItemsValidator, OrderItemsQtyValidator, OrderItemsSubtotalValidator } = require("./order.validation");
const { CustomerNomorValidator, CustomerNamaValidator, CustomerIdValidator, CustomerAlamatValidator, CustomerTeleponValidator } = require("../customer/customer.validation");
const { BarangIDValidator, BarangNomorValidator, BarangNamaValidator, BarangSatuanValidator, BarangHargaJualValidator, BarangStokValidator } = require("../barang/barang.validation");

const OrderRouter = express.Router();

OrderRouter.get('/', [IsAuthenticated], OrderList)
OrderRouter.post('/', [
  IsAuthenticated,
  Validate([
    OrderNomorValidator(),
    OrderTanggalValidator(),
    OrderCustomerValidator(),
    CustomerIdValidator("customer._id"),
    CustomerNomorValidator(true, false, "customer.nomor"),
    CustomerNamaValidator(false, "customer.nama"),
    CustomerAlamatValidator(false, "customer.alamat"),
    CustomerTeleponValidator(false, "customer.telepon"),
    OrderDibayarValidator(),
    OrderTotalValidator(),
    OrderItemsValidator(),
    OrderItemsQtyValidator(),
    OrderItemsSubtotalValidator(),
    BarangIDValidator("items.*._id"),
    BarangNomorValidator(true, false, "items.*.nomor"),
    BarangNamaValidator(false, "items.*.nama"),
    BarangSatuanValidator(false, "items.*.satuan"),
    BarangHargaJualValidator(false, "items.*.hargaJual"),
    BarangStokValidator(false, "items.*.stok")
  ])
], OrderCreate)
OrderRouter.get('/:id', [IsAuthenticated], OrderDetail)

module.exports = {
  OrderRouter
}