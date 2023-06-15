'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.hasMany(models.Product)
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty'
        },
        notEmpty: {
          msg: 'name cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};