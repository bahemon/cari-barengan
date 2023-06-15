const { Store, Mountain, User } = require('../../models');

class storeController {
  static async getAll(req, res, next) {
    try {
      const stores = await Store.findAll({
        include: [Mountain, User],
      });

      res.status(200).json(stores);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const store = await Store.findOne({
        include: [User, Mountain],
        where: { id: req.params.id },
      });

      if (!store) {
        throw { code: 404, message: 'Store not found' };
      }

      res.status(200).json(store);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = storeController;
