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
      return res.status(400).json({ detail: error.message })
    case "CastError":
      return res.status(400).json({ detail: "Pastikan format id benar" })
    case "Error404":
      return res.status(404).json({detail: error.message})
      case "Error401":
        return res.status(401).json({detail: error.message})
    default:
      return res.status(500).json({detail: "Please try again later!"})
  }
}

module.exports = {
  Error401,
  Error404,
  ExceptionHandler
}