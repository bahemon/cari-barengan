'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
      Transaction.hasMany(models.TransactionDetail)
    }
  }
  Transaction.init({
    startToRent: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'startToRent cannot be empty'
        },
        notNull: {
          msg: 'startToRent cannot be empty'
        }
      }
    },
    finishToRent: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'finishToRent cannot be empty'
        },
        notNull: {
          msg: 'finishToRent cannot be empty'
        }
      }
    },
    totalFee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: DataTypes.STRING,
    AuthorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'AuthorId cannot be empty'
        },
        notNull: {
          msg: 'AuthorId cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};