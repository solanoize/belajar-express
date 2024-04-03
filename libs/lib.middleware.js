const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");

const IsAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({detail: "Token is required for authentication"})
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decode;
  } catch (error) {
    return res.status(401).send({ detail: "Invalid token" })
  } 

  return next();
}

const Validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      // if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.cleanedData = matchedData(req);
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}

module.exports = {
  IsAuthenticated,
  Validate
}