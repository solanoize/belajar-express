const CustomerSearch = (req, model) => {
  const { search } = req.query;

  if (search) {
    return model.find({
      $or: [
        { "nomor": { $regex: ".*" + search + ".*", $options: 'i' } },
        { "nama": { $regex: ".*" + search + ".*", $options: 'i' } },
      ]
    })
  }

  return model;
}

const CustomerFilter = (req, model) => {
  const { field, value } = req.query;
  
  if (field && value) {
    return model.find({ [field]: value })
  }

  return model;
}

module.exports = {
  CustomerSearch,
  CustomerFilter
}