const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./user.model");

const UserNotExist = async (email) => {
  const result = await UserModel.findOne({ email })

  if (!result) {
    throw new Error("Email tidak terdaftar");
  }

  return result;
}

const ValidatePassword = async (req, user) => {
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    throw new Error("Password tidak cocok");
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