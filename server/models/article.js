'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
    }
  }
  Article.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title cannot be empty'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageUrl cannot be empty'
        },
        notEmpty: {
          msg: 'imageUrl cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description cannot be empty'
        },
        notEmpty: {
          msg: 'description cannot be empty'
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
    }
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};