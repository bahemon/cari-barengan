const { Store, Mountain, User } = require('../../models')

class storeController {
  static async addNew(req, res, next) {
    try {
      const { name, address, contactPerson, MountainId } = req.body

      const newStore = await Store.create({
        name,
        address,
        contactPerson,
        MountainId,
        AuthorId: req.user.id
      })

      res.status(201).json(newStore)
    } catch (err) {
      next(err)
    }
  }

  static async getAll(req, res, next) {
    try {
      const stores = await Store.findAll({
        include: [Mountain, User]
      })

      res.status(200).json(stores)
    } catch (err) {
      next(err)
    }
  }

  static async getById(req, res, next) {
    try {
      const store = await Store.findOne({
        include: [User, Mountain],
        where: { id: req.params.id }
      })

      if (!store) {
        throw { code: 404, message: 'Store not found' }
      }

      res.status(200).json(store)
    } catch (err) {
      next(err)
    }
  }

  static async updateById(req, res, next) {
    try {
      const { name, address, contactPerson } = req.body

      const store = await Store.findByPk(req.params.id)
      // console.log(name, address, contactPerson);
      if (!store) {
        throw { code: 404, message: 'Store not found' }
      }

      await Store.update({
        name,
        address,
        contactPerson
      },{where: {id: store.id}})

      res.status(200).json({
        message: `Store with id ${store.id} updated`
      })
    } catch (err) {
      next(err)
    }
  }

  static async deleteById(req, res, next) {
    try {
      const store = await Store.findByPk(req.params.id)

      if (!store) {
        throw { code: 404, message: 'Store not found' }
      }

      await Store.destroy({
        where: {
          id: store.id
        }
      })

      res.status(200).json({
        message: `Store with id ${store.id} deleted`
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = storeController