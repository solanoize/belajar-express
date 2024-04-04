const { validationResult } = require("express-validator");
const { Pagination } = require("../libs/lib.common");
const { ExceptionHandler, Error404 } = require("../libs/lib.exception");
const { BarangModel } = require("./barang.model");
const { BarangSearch, BarangFilter } = require("./barang.search");

async function BarangList(req, res) {
  try {
    const result = BarangModel.find()
    const search = BarangSearch(req, result)
    const filter = BarangFilter(req, search)
    const paging = await Pagination(req, res, filter)
    return res.status(200).json(paging);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function BarangCreate(req, res) {
  try {
    const result = await BarangModel.create(req.cleanedData)
    return res.status(201).json(result)
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function BarangDetail(req, res) {
  try {
    const data = await BarangModel.findOne({_id: req.params.id});
    if (!data) {
      throw new Error404("Barang not found")
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function BarangUpdate(req, res) {
  try {
    const data = await BarangModel.findOne({_id: req.params.id});

    if (!data) {
      throw new Error404("Barang not found")
    }

    const result = await BarangModel.findOneAndUpdate(
      {_id: req.params.id}, 
      req.body,
      {new: true}
    )

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

async function BarangDelete(req, res) {
  try {
    const data = await BarangModel.findOne({_id: req.params.id});

    if (!data) {
      throw new Error404("Barang not found")
    }
    
    await BarangModel.findOneAndDelete({_id: req.params.id});
    return res.status(204).json(null);
  } catch (error) {
    console.log(error);
    return ExceptionHandler(error, res)
  }
}

module.exports = {
  BarangList,
  BarangCreate,
  BarangDetail,
  BarangUpdate,
  BarangDelete
}