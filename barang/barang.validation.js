const { body } = require("express-validator");
const { BarangModel } = require("./barang.model");

const BarangIDValidator = (target="nomor") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .isMongoId()
    .withMessage("Format ID tidak valid.")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .custom(async (id) => {
      const barang = await BarangModel.findOne({_id: id});
      if (!barang) {
        // digunakan untuk module lain
        // untuk mereferensikan barang
        // ada atau tidaknya id
        throw new Error("Id barang tidak tersedia")
      }
    }).bail()
}

const BarangNomorValidator = (reverse=false, target="nomor") => {
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
      const barang = await BarangModel.findOne({nomor});
      if (reverse && !barang) {
        // digunakan untuk module lain
        // untuk mereferensikan barang
        // ada atau tidaknya nomor
        throw new Error("Nomor tidak tersedia")
      }

      if (!reverse && barang) {
        // digunakan untuk module barang saat ini
        // untuk mencegah duplikasi nomor barang
        throw new Error("Nomor sudah digunakan")
      }
    })
}

const BarangNamaValidator = (target="nama") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Nama tidak boleh kosong.")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 100 karakter")
    .bail()
}

const BarangSatuanValidator = (target="nama") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Nama tidak boleh kosong.")
    .bail()
    .isLength({ min: 1, max: 10})
    .withMessage("Nama tidak boleh kurang dari 5 dan lebih dari 10 karakter")
    .bail()
}

const BarangHargaJualValidator = (target="hargaJual") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt({min: 1000})
    .withMessage("Format harus bilangan bulat minimum 1000.")
    .bail()
}

const BarangStokValidator = (target="stok") => {
  return body(target)
    .exists()
    .withMessage("Field harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong.")
    .bail()
    .isInt({min: 1})
    .withMessage("Format harus bilangan bulat minimum 1.")
    .bail()
}

module.exports = {
  BarangIDValidator,
  BarangNomorValidator,
  BarangNamaValidator,
  BarangSatuanValidator,
  BarangStokValidator,
  BarangHargaJualValidator
}