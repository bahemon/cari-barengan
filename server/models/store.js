'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      // define association here
      Store.belongsTo(models.User, {
        foreignKey: 'AuthorId'
      })
      Store.belongsTo(models.Mountain)
      Store.hasMany(models.Product)
      Store.hasMany(models.TransactionDetail)
    }
  }
  Store.init({
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'address cannot be empty'
        },
        notNull: {
          msg: 'address cannot be empty'
        }
      }
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'contactPerson cannot be empty'
        },
        notNull: {
          msg: 'contactPerson cannot be empty'
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
        notNull: {
          msg: 'AuthorId cannot be empty'
        }
      }
    },
    MountainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'MountainId cannot be empty'
        },
        notNull: {
          msg: 'MountainId cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};