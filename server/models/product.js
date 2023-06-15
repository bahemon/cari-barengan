'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.belongsTo(models.Store)
      Product.hasMany(models.TransactionDetail)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty'
        },
        notNull: {
          msg: 'name cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        },
        notNull: {
          msg: 'Stock cannot be empty'
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
        notNull: {
          msg: 'imageUrl cannot be empty'
        }
      }
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
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
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'CategoryId cannot be empty'
        },
        notNull: {
          msg: 'CategoryId cannot be empty'
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
    modelName: 'Product',
  });
  return Product;
};