const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./user.model");
const { Error401 } = require("../libs/lib.exception");

const UserNotExist = async (email) => {
  const result = await UserModel.findOne({ email })

  if (!result) {
    throw new Error401("Email tidak terdaftar");
  }

  return result;
}

const ValidatePassword = async (req, user) => {
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new Error401("Password tidak cocok");
  }
}

const MakeJWTToken =  (payload) => {
  const token = jwt.sign(
    payload, 
    process.env.TOKEN_KEY,
    { expiresIn: "2h" }
  )

  return token;
} 

module.exports = {
  UserNotExist,
  ValidatePassword,
  MakeJWTToken
}