const express = require('express')
const setRouting = require('./src/router')
const bodyParser = require('body-parser')
const { logError, errorHandler } = require('./src/middlewares/error')

const app = express()
app.use(bodyParser.json())
const PORT = 3000

setRouting(app)

app.use(logError)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
