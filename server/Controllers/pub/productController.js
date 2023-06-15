const { Product, Category, Store } = require('../../models');

class productController {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        throw { code: 404, message: 'Product not found' };
      }

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = productController;
