const { body } = require("express-validator");
const { CustomerModel } = require("./customer.model");


const CustomerIDValidator = (target="_id") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isMongoId()
    .withMessage("Format ID tidak valid.")
    .bail()
    .custom(async (_id) => {
      const customer = await CustomerModel.findOne({_id});
      if (!customer) {
        // digunakan untuk module lain
        // untuk mereferensikan customer
        // ada atau tidaknya nomor
        throw new Error("ID customer tidak tersedia.")
      }

    }).bail()
}

const CustomerNomorValidator = (reverse=false, target="nomor") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima tepat 6 karakter.")
    .bail()
    .custom(async (nomor) => {
      const customer = await CustomerModel.findOne({nomor});
      if (!reverse && customer) {
        // digunakan untuk module lain
        // untuk mereferensikan customer
        // ada atau tidaknya nomor
        throw new Error("Nomor sudah digunakan")
      }

      if (reverse && !customer) {
        // digunakan untuk module customer saat ini
        // untuk mencegah duplikasi nomor customer
        throw new Error("Nomor customer tidak tersedia")
      }
    }).bail()
}

const CustomerNamaValidator = (target="nama") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Nama tidak boleh kosong.")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100")
    .bail()
}

const CustomerTeleponValidator = (target="telepon") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Telepon tidak boleh kosong.")
    .bail()
    .isLength({ min: 11, max: 13 })
    .withMessage("Nomor telepon minimal 11 karakter dan maksimal 13 karakter")
    .bail()
}

const CustomerAlamatValidator = (target="alamat") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong.")
    .bail()
    .isLength({ min: 10, max: 150 })
    .withMessage(" minimal 10 karakter dan maksimal 150 karakter")
    .bail()
}

module.exports = {
  CustomerIDValidator,
  CustomerNamaValidator,
  CustomerAlamatValidator,
  CustomerNomorValidator,
  CustomerTeleponValidator,
}