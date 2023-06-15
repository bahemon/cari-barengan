'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Transaction)
      TransactionDetail.belongsTo(models.Product)
      TransactionDetail.belongsTo(models.Store)
    }
  }
  TransactionDetail.init({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price cannot be empty'
        },
        notNull: {
          msg: 'price cannot be empty'
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
        notNull: {
          msg: 'amount cannot be empty'
        }
      }
    },
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'TransactionId cannot be empty'
        },
        notNull: {
          msg: 'TransactionId cannot be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'ProductId cannot be empty'
        },
        notNull: {
          msg: 'ProductId cannot be empty'
        }
      }
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'StoreId cannot be empty'
        },
        notNull: {
          msg: 'StoreId cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};