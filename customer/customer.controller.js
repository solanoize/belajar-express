const { CustomerModel } = require("./customer.model");

async function CustomerList(req, res) {
  try {
    
  } catch (error) {
    
  }
}

async function CustomerCreate(req, res) {
  try {
    const result = await CustomerModel.create(req.cleanedData)
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({detail: "Ups error"});
  }
}


module.exports = {
  CustomerCreate
}
