const { body } = require("express-validator");
const { CustomerModel } = require("./customer.model");

const CustomerIdValidator = (target="_id") => {
  /**
   * Implement to another modules.
   */
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Id tidak boleh kosong.")
    .isMongoId()
    .withMessage("ID tidak valid")
    .custom(async (_id) => {
      const customer = await CustomerModel.findOne({ _id });
      if (!customer) {
        throw new Error("ID Customer tidak tersedia.")
      }
    })
    .bail()
}

const CustomerNomorValidator = (reverse=false, optional=false, target="nomor") => {
  const validator = body(target)
  if (optional) {
    validator.optional();
  }

  validator.exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .custom(async (nomor) => {
      const customer = await CustomerModel.findOne({nomor});
      if (!reverse && customer) {
        // digunakan untuk module saat ini
        throw new Error("Nomor sudah digunakan")
      }

      if (reverse && !customer) {
        // digunakan untuk module lain
        // untuk memastikan nomor customer ada!
        throw new Error("Nomor customer tidak tersedia.")
      }
    })
  
  return validator;
}

const CustomerNamaValidator = (optional=false, target="nama") => {
  const validator = body(target)

  if (optional) {
    validator.optional();
  }
  
  validator.exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong.")
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100")

  return validator;
}

const CustomerTeleponValidator = (optional=false, target="telepon") => {
  const validator = body(target)
  if (optional) {
    validator.optional();
  }

  validator.exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Telepon tidak boleh kosong.")
    .isLength({ min: 11, max: 13 })
    .withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
  
  return validator;
}

const CustomerAlamatValidator = (optional=false, target="alamat") => {
  const validator = body(target)
  if (optional) {
    validator.optional();
  }

  validator.exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong.")
    .isLength({ min: 10, max: 150 })
    .withMessage(" minimal 10 karakter dan maksimal 150 karakter")

  return validator;
}

module.exports = {
  CustomerIdValidator,
  CustomerNamaValidator,
  CustomerAlamatValidator,
  CustomerNomorValidator,
  CustomerTeleponValidator
}