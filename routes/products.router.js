const express = require('express')
const router = express.Router()
const ProductsService = require('../services/products.service')
const validatorHandler = require('../middlewares/validator.handler')
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  partialUpdateProductSchema,
  deleteProductSchema
} = require('../schemas/products.schema')

const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()
  res.json(products)
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res, next) => {
  try {
    const { body } = req

    const data = await service.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const data = await service.update(id, body)

    res.json({
      message: 'Updated',
      data,
      id
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(partialUpdateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const { body } = req

    const data = await service.partialUpdate(id, body)

    res.json({
      message: 'Updated',
      data,
      id
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandler(deleteProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params

    const data = await service.delete(id)

    res.json({
      message: `Deleted product with id ${id}`,
      data
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
