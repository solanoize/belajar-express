const bcrypt = require("bcryptjs");
const { UserModel } = require("./user.model");

async function UserCreate(req, res) {
  try {
    const passwordEncrypted = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({...req.body, password: passwordEncrypted});
    const {password, ...payload} = req.body;
    return res.status(201).json(payload);
  } catch (error) {
    console.log(error);
    return res.status(400).json({detail: "Ups error"});
  }
}

module.exports = {
  UserCreate
}