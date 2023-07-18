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
    const payload = {
      message: error.message
    }
    if (process.env.NODE_ENV === 'development') {
      payload['stack'] = error.stack
    }
    res.status(500).json(payload)
  }
}

module.exports = { errorHandler, logError }
