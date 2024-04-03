const { ExceptionHandler } = require("../libs/lib.exception");
const { CustomerModel } = require("./customer.model");

async function CustomerList(req, res) {
  try {
    
  } catch (error) {
    return ExceptionHandler(error, res)
  }
}

async function CustomerCreate(req, res) {
  try {
    const result = await CustomerModel.create(req.cleanedData)
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}


module.exports = {
  CustomerCreate
}
