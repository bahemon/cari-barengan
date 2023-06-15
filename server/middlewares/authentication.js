const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;

    if (!access_token) {
      throw { code: 401, message: 'Invalid Token' };
    }
    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { code: 401, message: 'Invalid Token' };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
