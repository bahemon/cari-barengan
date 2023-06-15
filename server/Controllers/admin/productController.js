const { Product, Category, Store } = require('../../models')
const imageKitHandle = require('../../helpers/imageKit/imageKit')

class productController {
  static async addNew(req, res, next) {
    try {
      const { name, stock, price, CategoryId, StoreId } = req.body
      const imageLink = await imageKitHandle(req.file)

      const newProduct = await Product.create({
        name,
        stock,
        imageUrl: imageLink.url,
        price,
        CategoryId,
        StoreId
      })

      res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  static async getAll(req, res, next) {
    try {
      let store = await Store.findByPk(req.params.StoreId)

      // if (!store) {
      //   throw { code: 404, message: 'Store not found' };
      // }

      const products = await Product.findAll({
        include: [Category, Store],
        where: { StoreId: req.params.StoreId }
      })

      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const product = await Product.findOne({
        include: [Category, Store],
        where: { id: req.params.id }
      })

      if (!product) {
        throw { code: 404, message: 'Product not found' }
      }

      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async updateById(req, res, next) {
    try {
      const { name, stock, price } = req.body

      await Product.update({
        name,
        stock,
        price
      }, { where: { id: req.params.id } })

      res.status(200).json({
        message: `Product updated`
      })
    } catch (err) {
      // console.log(err)
      next(err)
    }
  }

  static async updateStatusById(req, res, next) {
    try {
      const { isAvailable } = req.body
      const product = await Product.findByPk(req.params.id)

      if (!product) {
        throw { code: 404, message: 'Product not found' }
      }

      await product.update({
        isAvailable
      })

      res.status(200).json({
        message: `Product isAvailable with id ${product.id} updated`
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id)

      if (!product) {
        throw { code: 404, message: 'Product not found' }
      }

      await product.destroy()

      res.status(200).json({
        message: `Product with id ${product.id} deleted`
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController