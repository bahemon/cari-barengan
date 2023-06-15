'use strict';
const { Model } = require('sequelize');
const { hashedPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Store, {
        foreignKey: 'AuthorId',
      });
      User.hasMany(models.Thread, {
        foreignKey: 'AuthorId',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'AuthorId',
      });
      User.hasMany(models.Equipment, {
        foreignKey: 'AuthorId',
      });
      User.hasMany(models.Transaction, {
        foreignKey: 'AuthorId',
      });
      User.hasMany(models.Article, {
        foreignKey: 'AuthorId',
      });

      User.hasMany(models.ThreadMembers);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty',
          },
          notNull: {
            msg: 'Username cannot be empty',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty',
          },
          notNull: {
            msg: 'Email cannot be empty',
          },
          isEmail: {
            msg: 'Wrong email format',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password cannot be empty',
          },
          notNull: {
            msg: 'Password cannot be empty',
          },
          len: {
            args: 5,
            msg: 'Password minimum character is 5',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Admin',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((User, options) => {
    User.password = hashedPassword(User.password);
  });

  return User;
};
