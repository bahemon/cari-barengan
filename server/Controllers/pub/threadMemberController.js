const { ThreadMembers, Thread, User, Profile, Mountain } = require('../../models');

class ThreadMemberController {
  static async createThreadMember(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const thread = await Thread.findByPk(id);

      if (!thread) {
        throw { code: 404, message: 'Thread not found' };
      }
      console.log(thread);
      await ThreadMembers.create({ status: 'Pending', UserId: req.user.id, ThreadId: thread.id, MountainId: thread.MountainId });

      res.status(201).json({ message: 'Created member successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async editThreadMember(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await ThreadMembers.update({ status }, { where: { id } });

      res.status(200).json({ message: 'Update member successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async threadMembersByUser(req, res, next) {
    try {
      const member = await ThreadMembers.findAll({
        include: [
          { model: Thread },

          {
            model: User,
          },
          { model: Mountain },
        ],
        where: {
          UserId: req.user.id,
        },
      });

      res.status(200).json(member);
    } catch (error) {
      console.log(error);
    }
  }

  static async threadMembersList(req, res, next) {
    try {
      const { id } = req.params;

      const member = await ThreadMembers.findAll({
        include: [
          { model: Thread },
          {
            model: User,
            include: Profile,
          },
        ],
        where: {
          ThreadId: id,
        },
      });

      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  }

  static async getThreadById(req, res, next) {
    try {
      const { ThreadId } = req.params;

      const threadMember = await ThreadMembers.findAll({
        include: [
          {
            model: User,
            include: Profile,
          },
          {
            model: Thread,
            where: {
              id: ThreadId,
            },
          },
        ],
      });

      const newData = threadMember.filter((el) => {
        if (el.status === 'Joined' || el.status === 'Pending') {
          return el;
        }
      });

      const joined = [];
      let pending = [];

      newData.forEach((el) => {
        if (el.status === 'Joined') {
          joined.push(el);
        } else {
          pending.push(el);
        }
      });

      if (joined.length === threadMember[0].Thread.maxCapacity) {
        pending = [];
      }

      res.status(200).json({ joined, pending });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ThreadMemberController;
