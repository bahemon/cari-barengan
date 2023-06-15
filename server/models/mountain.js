'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mountain extends Model {
    static associate(models) {
      // define association here
      Mountain.hasOne(models.Store)
      Mountain.hasMany(models.Thread)
      Mountain.hasMany(models.ThreadMembers)
    }
  }
  Mountain.init({
    name: DataTypes.STRING,
    province: DataTypes.STRING,
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
    location: DataTypes.GEOMETRY,
    masl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'masl cannot be empty'
        },
        notNull: {
          msg: 'masl cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Mountain',
  });
  return Mountain;
};