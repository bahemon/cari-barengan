const { comparedPassword } = require('../../helpers/bcrypt');
const { generateToken } = require('../../helpers/jwt');
const imageKitHandle = require('../../helpers/imageKit/imageKit');
const { User, Profile, sequelize } = require('../../models');

class UserController {
  static async register(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { username, email, password, fullName, dateOfBirth, gender } = req.body;

      const imageLink = await imageKitHandle(req.file);

      if (!imageLink) {
        throw { code: 400, message: 'Failed to get ImageLink' };
      }

      const user = await User.create(
        {
          username,
          email,
          password,
          role: 'Hiker',
        },
        { transaction: t }
      );

      await Profile.create(
        {
          fullName,
          dateOfBirth,
          gender,
          profileImage: imageLink.url,
          UserId: user.id,
        },
        { transaction: t, validate: true }
      );

      await t.commit();

      const access_token = generateToken({
        id: user.id,
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        access_token,
      });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { code: 400, message: 'Email is required' };
      }
      if (!password) {
        throw { code: 400, message: 'Password is required' };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { code: 400, message: 'Invalid email/password' };
      }

      const isValidPassword = comparedPassword(password, user.password);

      if (!isValidPassword) {
        throw { code: 400, message: 'Invalid email/password' };
      }

      const access_token = generateToken({
        id: user.id,
      });

      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
