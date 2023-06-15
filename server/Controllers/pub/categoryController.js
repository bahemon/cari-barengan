const { Category } = require('../../models');

class CategoryController {
  static async getAll(req, res, next) {
    try {
      const data = await Category.findAll();

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Category.findByPk(id);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
