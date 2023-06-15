const { Article, User } = require('../../models');

class articleController {
  static async getAll(req, res, next) {
    try {
      const articles = await Article.findAll({
        include: [User],
      });

      res.status(200).json(articles);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;

      const article = await Article.findByPk(id);

      if (!article) {
        throw { code: 404, message: 'Article not found' };
      }

      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = articleController;
