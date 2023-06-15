const { Article, User } = require('../../models')
const imageKitHandle = require('../../helpers/imageKit/imageKit')


class articleController {
  static async addNew(req, res, next) {
    try {
      const { title, description } = req.body
      console.log(req.file, "<<<<<<<<<<<<<<<< reqfileeeeeeeeee")
      const imageLink = await imageKitHandle(req.file)

      console.log(imageLink, ">>>>>>>>>>>>>>>>>>")

      if (!imageLink) {
        throw { code: 400, message: 'Failed to get ImageLink' }
      }

      const newArticle = await Article.create({
        title,
        imageUrl: imageLink.url,
        description,
        AuthorId: req.user.id
      })

      res.status(201).json(newArticle)
    } catch (err) {
      next(err)
    }
  }

  static async getAll(req, res, next) {
    try {
      const articles = await Article.findAll({
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
        }]
      })

      res.status(200).json(articles)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const article = await Article.findOne({
        where: { id: req.params.id },
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
        }]
      })

      if (!article) {
        throw { code: 404, message: 'Article not found' }
      }

      res.status(200).json(article)
    } catch (err) {
      next(err)
    }
  }

  static async updateById(req, res, next) {
    try {
      const { title, imageUrl, description } = req.body

      const article = await Article.findByPk(req.params.id)

      if (!article) {
        throw { code: 404, message: 'Article not found' }
      }

      await article.update({
        title,
        imageUrl,
        description
      })

      res.status(200).json({
        message: `Article with id ${article.id} updated`
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const article = await Article.findByPk(req.params.id)

      if (!article) {
        throw { code: 404, message: 'Article not found' }
      }

      await article.destroy()

      res.status(200).json({
        message: `Article with id ${article.id} deleted`
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = articleController