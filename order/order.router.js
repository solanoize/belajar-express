const express = require("express");
const { IsAuthenticated } = require("../libs/lib.middleware");
const { OrderCreate, OrderDetail, OrderList } = require("./order.controller");

const OrderRouter = express.Router();

OrderRouter.get('/', [IsAuthenticated], OrderList)
OrderRouter.post('/', [IsAuthenticated], OrderCreate)
OrderRouter.get('/:id', [IsAuthenticated], OrderDetail)

module.exports = {
  OrderRouter
}