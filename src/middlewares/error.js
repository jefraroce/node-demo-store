function logError (error, req, res, next) {
  console.log('logHandler')
  console.error(error)
  next(error)
}

function errorHandler (error, req, res, next) {
  console.log('errorHandler ')
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  })
}

module.exports = { errorHandler, logError }
