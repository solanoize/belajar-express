const express = require("express");
const { UserCreate } = require("./user.controller");

const UserRouter = express.Router();

UserRouter.post("/", UserCreate);

module.exports = {
  UserRouter
}