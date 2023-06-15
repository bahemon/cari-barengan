const { Mountain, Comment, User, Profile, ThreadMembers, Thread } = require('../../models');

class MountainController {
  static async getAll(req, res, next) {
    try {
      const { filter } = req.query;

      const option = {};

      if (filter) {
        option.where = { province: filter };
      }

      const data = await Mountain.findAll(option);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MountainController;
