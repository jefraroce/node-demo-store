const express = require('express')
const setRouting = require('./src/router')
const bodyParser = require('body-parser')
const { logError, errorHandler } = require('./src/middlewares/error')
const morgan = require('morgan')
const cors = require('cors')
const { config } = require('dotenv')
config()

const PORT = process.env.PORT || 3000
const app = express()

// Setting cors
const whitelist = [`localhost:${PORT}`, 'nj-store.tintosoft.co']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Forbidden!!!'));
    }
  }
}))

// Supporting for JSON in request.body
app.use(bodyParser.json())

// Logging request's details on http errors
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(morgan('tiny', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

// Adding routes
setRouting(app)

// Error handling
app.use(logError)
app.use(errorHandler)

// Starting server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
