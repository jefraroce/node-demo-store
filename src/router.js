const { Router } = require('express')

const productsRouter = require('./products/routes')
const categoriesRouter = require('./categories/routes')

function setRouting(app) {
  const router = Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
}

module.exports = setRouting
