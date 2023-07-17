function logError (error, req, res, next) {
  console.log('logHandler')
  console.error(error)
  next(error)
}

// eslint-disable-next-line no-unused-vars
function errorHandler (error, req, res, next) {
  console.log('errorHandler')
  if (error.isBoom) {
    const { statusCode, payload } = error.output
    res.status(statusCode).json(payload)
  } else {
    res.status(500).json({
      message: error.message,
      stack: error.stack
    })
  }
}

module.exports = { errorHandler, logError }
