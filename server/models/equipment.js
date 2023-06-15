'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      // define association here
      Equipment.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
    }
  }
  Equipment.init({
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
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'amount cannot be empty'
        },
        notEmpty: {
          msg: 'amount cannot be empty'
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
    modelName: 'Equipment',
  });
  return Equipment;
};