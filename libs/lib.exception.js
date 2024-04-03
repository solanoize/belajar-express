class Error404 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error404"
  }
}

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.name = "Error401"
  }
}

const ExceptionHandler = (error, res) => {
  switch (error.name) {
    case "MongoServerError":
      return res.status(500).json({ detail: error.message })
    case "CastError":
      return res.status(500).json({detail: "Pastikan format id benar"})
    case "Error404":    
      return res.status(404).json({detail: error.message || "Data not found"});
    case "Error401":
      return res.status(401).json({detail: error.message || "Unauthorized"})
    default:
      return res.status(500).json({ detail: "Something when wrong, please try again later!" })
  }
}

module.exports = {
  Error404,
  Error401,
  ExceptionHandler
}