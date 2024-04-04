const { body } = require("express-validator")
const { BarangModel } = require("./barang.model")

const BarangIDValidator = (target="_id") => {
  /**
   * Implement to another modules
   */
  return body(target)
    .exists()
    .withMessage("Field harus tersedia")
    .bail()
    .notEmpty()
    .withMessage("Field tidak boleh kosong")
    .isMongoId()
    .withMessage("Format ID tidak valid")
    .bail()
    .custom(async (_id) => {
      const barang = await BarangModel.findOne({_id})
      if (!barang) {
        throw new Error("Barang tidak ada di dalam database.")
      }
    })
}

const BarangNomorValidator = (reverse=false, optional=false, target="nomor") => {
  let validator = body(target);

  if (optional) {
    validator.optional()
  }
    
  validator.exists()
    .withMessage("Field ini harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field ini harus diisi!")
    .bail()
    .isLength({ min: 6, max: 6 })
    .withMessage("Field hanya menerima 6 karakter.")
    .bail()
    .custom(async (nomor) => {
      const barang = await BarangModel.findOne({nomor})
      if (reverse && !barang) {
        // digunakan untuk module lain
        // untuk mereferensikan barang 
        // dan memastikan nomor barangnya ada!
        throw new Error("Nomor barang tidak tersedia!")
      }
      
      if (!reverse && barang) {
        // digunakan untuk module barang saat ini
        throw new Error("Nomor sudah digunakan!")
      }
    })

  return validator;
}

const BarangNamaValidator = (optional=false, target="nama") => {
  let validator = body(target);

  if (optional) {
    validator.optional()
  }

  validator.exists()
    .withMessage("Field ini harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field ini harus diisi!")
    .bail()
    .isLength({ min: 5, max: 100 })
    .withMessage("Field tidak boleh kurang dari 5 dan lebih dari 100 karaketer.")
    .bail()
  
  return validator;
}

const BarangSatuanValidator = (optional=false, target="satuan") => {
  let validator = body(target);

  if (optional) {
    validator.optional()
  }
    
  validator.exists()
    .withMessage("Field ini harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field ini harus diisi!")
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage("Field tidak boleh kurang dari 1 dan lebih dari 10 karaketer.")
    .bail()
  
  return validator;
}

const BarangHargaJualValidator = (optional=false, target="hargaJual") => {
  let validator = body(target);

  if (optional) {
    validator.optional()
  }

  validator.exists()
    .withMessage("Field ini harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field ini harus diisi!")
    .bail()
    .isInt({min: 1000})
    .withMessage("Format harus bilangan bulat minimal 1000")
    .bail()
  
  return validator;
}

const BarangStokValidator = (optional=false, target="stok") => {
  let validator = body(target);

  if (optional) {
    validator.optional()
  }

  validator.exists()
    .withMessage("Field ini harus tersedia!")
    .bail()
    .notEmpty()
    .withMessage("Field ini harus diisi!")
    .bail()
    .isInt({min: 1})
    .withMessage("Format harus bilangan bulat minimal 1.")
    .bail()
  
  return validator;
}

module.exports = {
  BarangIDValidator,
  BarangNomorValidator,
  BarangNamaValidator,
  BarangSatuanValidator,
  BarangHargaJualValidator,
  BarangStokValidator
}