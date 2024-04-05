const BarangSearch = (req, model) => {
  const { search } = req.query;

  if (search) {
    return model.find({
      $or: [
        { "nomor": { $regex: ".*" + search + ".*", $options: 'i' } },
        { "nama": { $regex: ".*" + search + ".*", $options: 'i' } },
        { "satuan": { $regex: ".*" + search + ".*", $options: 'i' } },
      ]
    })
  }

  return model;
}

const BarangFilter = (req, model) => {
  const { field, value } = req.query;

  if (field && value) {
    return model.find({ [field]: value })
  }

  return model;
}

module.exports = {
  BarangSearch,
  BarangFilter
}