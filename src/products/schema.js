const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().alphanum().min(3).max(50)
const price = Joi.number().min(10)
const image = Joi.string().uri()

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image
})

const updateProductSchema = Joi.object({
  name,
  price,
  image
})

const getProductSchema = Joi.object({
  id: id.required()
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
