const { Router } = require('express')
const ProductsService = require('./service')
const { getProductSchema, createProductSchema, updateProductSchema } = require('./schema')
const validatorHandler = require('../middlewares/validator')

const router = Router()
const productsService = new ProductsService()

router.get('/', (req, res) => {
  const products = productsService.findAll()

  res.json(products)
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), (req, res, next) => {
  try {
    const { id } = req.params
    const product = productsService.findById(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createProductSchema, 'params'), (req, res, next) => {
  try {
    const newProduct = productsService.create(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), (req, res, next) => {
  try {
    const { id } = req.params
    const updatedProduct = productsService.update(id, req.body)
    res.json(updatedProduct)
  } catch (error) {
    next(error)
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
