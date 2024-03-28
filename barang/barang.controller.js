function BarangList(req, res) {
  return res.status(200).json({ok: 1})
}

function BarangCreate(req, res) {
  return res.status(201).json({ok: 2})
}

function BarangDetail(req, res) {
  return res.status(200).json({ok: 3})
}

function BarangUpdate(req, res) {
  return res.status(200).json({ok: 4})
}

function BarangDelete(req, res) {
  return res.status(204).json(null)
}

module.exports = {
  BarangList,
  BarangCreate,
  BarangDetail,
  BarangUpdate,
  BarangDelete
}