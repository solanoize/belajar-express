const { body } = require("express-validator");
const { CustomerModel } = require("./customer.model");

const CustomerIdValidator = () => {
  return body("id")
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Id tidak boleh kosong.")
    .isLength({ min: 6, max: 6 })
    .withMessage("Nomor hanya menerima tepat 6 karakter.")
    .isMongoId()
    .withMessage("ID tidak valid")
}

const CustomerNomorValidator = () => {
  return body("nomor")
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .custom(async (nomor) => {
      const customer = await CustomerModel.findOne({nomor});
      if (customer) {
        throw new Error("Nomor sudah digunakan")
      }
    })
}

const CustomerNamaValidator = () => {
  return body("nama")
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Nama tidak boleh kosong.")
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100")
}

const CustomerTeleponValidator = () => {
  return body("telepon")
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Telepon tidak boleh kosong.")
    .isLength({ min: 11, max: 13 })
    .withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
}

const CustomerAlamatValidator = (target) => {
  return body("alamat")
    .exists()
    .withMessage("Field harus tersedia!")
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong.")
    .isLength({ min: 10, max: 150 })
    .withMessage(" minimal 10 karakter dan maksimal 150 karakter")
}

module.exports = {
  CustomerIdValidator,
  CustomerNamaValidator,
  CustomerAlamatValidator,
  CustomerNomorValidator,
  CustomerTeleponValidator
}