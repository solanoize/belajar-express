const { body, param } = require("express-validator");
const { CustomerModel } = require("./customer.model");

const CustomerIDValidator = ({target="_id"}) => {
  const validator = body(target);
  validator.exists().withMessage("Field harus tersedia!")
  validator.isMongoId().withMessage("Field tidak valid");
  validator.custom(async (id) => {
    const customer = await CustomerModel.findOne({_id: id});
    if (!customer) {
      throw new Error("Id customer tidak ditemukan!")
    }
  })

}

const CustomerNomorValidator = ({optional = false, target="nomor"}) => {
  const validator = body(target)

  if (optional) {
    validator.optional()
  }

  validator.exists().withMessage("Field harus tersedia!")
  validator.notEmpty().withMessage("Field tidak boleh kosong.")
  validator.isLength({ min: 6, max: 6 }).withMessage("Field hanya menerima tepat 6 karakter.")
  validator.custom(async (nomor) => {
    const customer = await CustomerModel.findOne({nomor});
    if (customer) {
      throw new Error("Nomor sudah digunakan")
    }
  })

  return validator
}

const CustomerNamaValidator = ({ optional=false, target="nama" }) => {
  const validator = body(target)
  
  if (optional) {
    validator.optional()
  }

  validator.exists().withMessage("Field harus tersedia!")
  validator.notEmpty().withMessage("Nama tidak boleh kosong.")
  validator.isLength({ min: 5, max: 100 }).withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100")
  return validator;
}

const CustomerTeleponValidator = ({ optional=false, target="telepon" }) => {
  const validator = body(target)

  if (optional) {
    validator.optional()
  }

  validator.exists().withMessage("Field harus tersedia!")
  validator.notEmpty().withMessage("Telepon tidak boleh kosong.")
  validator.isLength({ min: 11, max: 13 }).withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
  return validator;
}

const CustomerAlamatValidator = ({optional=false, target="alamat"}) => {
  const validator = body(target)
  
  if (optional) {
    validator.optional()
  }

  validator.exists().withMessage("Field harus tersedia!")
  validator.notEmpty().withMessage("Alamat tidak boleh kosong.")
  validator.isLength({ min: 10, max: 150 }).withMessage(" minimal 10 karakter dan maksimal 150 karakter")
  return validator;
}

module.exports = {
  CustomerIDValidator,
  CustomerNamaValidator,
  CustomerAlamatValidator,
  CustomerNomorValidator,
  CustomerTeleponValidator
}