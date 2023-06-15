'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
    }
  }
  Comment.init({
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'comment cannot be empty'
        },
        notEmpty: {
          msg: 'comment cannot be empty'
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'AuthorId cannot be empty'
        },
        notEmpty: {
          msg: 'AuthorId cannot be empty'
        }
      }
    },
    ThreadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ThreadId cannot be empty'
        },
        notEmpty: {
          msg: 'ThreadId cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};