const faker = require('faker')
const boom = require('@hapi/boom')

class ProductsService {
  constructor () {
    this.products = []
    this.generate()
  }

  generate () {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async find () {
    return this.products
  }

  getIndex (id) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) throw boom.notFound('Product not found')

    return index
  }

  async findOne (id) {
    return this.products[this.getIndex(id)]
  }

  async create (data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name: data.name,
      price: data.price,
      image: data.image
    }

    this.products.push(newProduct)

    return newProduct
  }

  async update (id, { name, price, image }) {
    const index = this.getIndex(id)

    const updatedProduct = {
      id: this.products[index].id,
      name,
      price,
      image
    }

    this.products[index] = updatedProduct

    return updatedProduct
  }

  async partialUpdate (id, { name, price, image }) {
    const index = this.getIndex(id)

    const updatedProduct = {
      ...this.products[index],
      name,
      price,
      image
    }

    this.products[index] = updatedProduct

    return updatedProduct
  }

  async delete (id) {
    const index = this.getIndex(id)

    const productDeleted = this.products[index]

    delete this.products[index]

    return productDeleted
  }
}

module.exports = ProductsService
