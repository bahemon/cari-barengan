const { Thread, Comment, Mountain, User, Profile, ThreadMembers, Store } = require('../../models');
const { Sequelize } = require('../../models');

class ThreadController {
  static async fetchThreads(req, res, next) {
    try {
      const { limit, filter } = req.query;

      const option = {
        include: [
          {
            model: Mountain,
          },
          {
            model: Comment,
          },
          {
            model: User,
            include: Profile,
          },
        ],
      };

      if (filter) {
        option.include[0] = { model: Mountain, include: Store, where: { id: filter } };
      } else {
        option.include[0] = { model: Mountain, include: Store };
      }

      if (limit) {
        option.limit = limit;
        option.order = [['createdAt', 'DESC']];
      }

      const threads = await Thread.findAll(option);

      res.status(200).json(threads);
    } catch (error) {
      next(error);
    }
  }

  static async fetchThreadsByUser(req, res, next) {
    try {
      const option = {
        include: [
          {
            model: Mountain,
          },
          {
            model: Comment,
          },
          {
            model: User,
            include: Profile,
          },
        ],
        where: {
          AuthorId: req.user.id,
        },
      };

      const threads = await Thread.findAll(option);

      res.status(200).json(threads);
    } catch (error) {
      next(error);
    }
  }

  static async threadById(req, res, next) {
    try {
      const { id } = req.params;

      const threads = await Thread.findByPk(id, {
        include: [
          {
            model: Comment,
          },
          {
            model: Mountain,
          },
        ],
      });

      res.status(200).json(threads);
    } catch (error) {
      next(error);
    }
  }

  static async createThread(req, res, next) {
    try {
      const { description, maxCapacity, dateToHike, dateFinishHike, MountainId, AuthorId } = req.body;

      const mountain = await Mountain.findByPk(+MountainId);

      const location = Sequelize.fn('ST_GeomFromText', `POINT(${mountain.location.coordinates[0]} ${mountain.location.coordinates[1]})`);

      const thread = await Thread.create({
        description,
        maxCapacity,
        dateToHike,
        dateFinishHike,
        status: 'Active',
        MountainId,
        AuthorId,
        authorLocation: location,
      });

      await ThreadMembers.create({ status: 'Joined', UserId: req.user.id, ThreadId: thread.id, MountainId });

      res.status(201).json({ message: 'Create threads successfull!' })
    } catch (error) {
      next(error);
    }
  }

  static async editThread(req, res, next) {
    try {
      const { id } = req.params;
      const { description, maxCapacity, dateToHike, dateFinishHike, AuthorId } = req.body;

      //validasi error gunung

      const threads = Thread.findByPk(id);

      if (!threads) {
        throw { code: 404, message: 'Thread not found' };
      }

      await Thread.update(
        {
          description,
          maxCapacity,
          dateToHike,
          dateFinishHike,
          AuthorId,
        },
        { where: { id: id } }
      );

      res.status(200).json({ message: 'Edit threads successfull!' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteThread(req, res, next) {
    try {
      const { id } = req.params;

      const thread = await Thread.findByPk(id);

      if (!thread) {
        throw { code: 404, message: 'Thread not found' };
      }

      await Thread.destroy({ where: { id } });

      res.status(200).json({ message: 'Delete threads successfull!' });
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req, res, next) {
    try {
      const { ThreadId, comment } = req.body;

      await Comment.create({
        AuthorId: req.user.id,
        ThreadId,
        comment,
      });

      res.status(201).json({ message: 'Add comment success fully!' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ThreadController;
