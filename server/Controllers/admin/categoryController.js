const { Category } = require('../../models')

class CategoryController {
  static async getAll(req, res, next) {
    try {
      const data = await Category.findAll()

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController