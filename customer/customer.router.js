const express = require("express");
const { IsAuthenticated, Validate } = require("../libs/lib.middleware");
const { CustomerCreate } = require("./customer.controller");
const { CustomerNomorValidator, CustomerNamaValidator, CustomerTeleponValidator, CustomerAlamatValidator } = require("./customer.validation");
const { body } = require("express-validator");

const CustomerRouter = express.Router();

CustomerRouter.post('/', [
  IsAuthenticated,
  Validate([
    CustomerNomorValidator(),
    CustomerNamaValidator(),
    CustomerTeleponValidator(),
    CustomerAlamatValidator()
  ])
], CustomerCreate)

module.exports = {
  CustomerRouter
}