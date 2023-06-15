const { Mountain } = require('../../models')

class MountainController {
  static async getAll(req, res, next) {
    try {
      const data = await Mountain.findAll()

      res.status(200).json(data)
    } catch (err) {
      next(err)

    }
  }
}

module.exports = MountainController