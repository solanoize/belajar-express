const { Pagination } = require("../libs/lib.common");
const { ExceptionHandler, Error404 } = require("../libs/lib.exception");
const { CustomerModel } = require("./customer.model");
const { CustomerSearch, CustomerFilter } = require("./customer.search");

async function CustomerList(req, res) {
  try {
    const result = CustomerModel.find();
    const search = CustomerSearch(req, result);
    const filter = CustomerFilter(req, search);
    const paging = await Pagination(req, res, filter);
    return res.status(200).json(paging)
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

async function CustomerDetail(req, res) {
  try {
    const result = await CustomerModel.findOne({_id: req.body.id});
    if (!result) {
      throw new Error404("Customer tidak ditemukan")
    }

    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}


module.exports = {
  CustomerList,
  CustomerCreate,
  CustomerDetail
}
