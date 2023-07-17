const { faker } = require('@faker-js/faker')

class ProductsService {
  constructor() {
    this.products = []
    this.generate()
    console.log('ProductsService constructor...')
  }

  generate() {
    const limit = 100
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url()
      })
    }
  }

  create(productData) {
    const newProduct = {
      ...productData,
      id: faker.string.uuid()
    }
    this.products.push(newProduct)
  }

  findAll() {
    return this.products
  }

  findById(id) {
    throw new Error('rayos')
    return this.products.find(p => p.id === id)
  }

  update(id, newData) {
    const index = this.products.findIndex(p => p.id === id)
    if (index >= 0) {
      this.products[index] = Object.assign({}, this.products[index], newData)
      return this.products[index]
    }

    return null
  }

  delete(id) {
    const index = this.products.findIndex(p => p.id === id)
    if (index >= 0) {
      return this.products.splice(index, 1)
    }

    return false
  }
}

module.exports = ProductsService
