const { Router } = require('express')
const ProductsService = require('./service')

const router = Router()
const productsService = new ProductsService()

router.get('/', (req, res) => {
  const products = productsService.findAll()

  res.json(products)
})

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const product = productsService.findById(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res) => {
  productsService.create(req.body)
  res.status(201)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const updatedProduct = productsService.update(id, req.body)
  if (updatedProduct) {
    res.json(updatedProduct)
  } else {
    res.sendStatus(403)
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  if (productsService.delete(id)) {
    res.sendStatus(204)
  } else {
    res.sendStatus(403)
  }
})

module.exports = router
