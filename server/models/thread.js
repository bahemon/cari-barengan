'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      // define association here
      Thread.belongsTo(models.User, {
        through: 'ThreadMembers',
        foreignKey: 'AuthorId',
      }); //belongsto
      Thread.belongsTo(models.Mountain); //belongsto
      Thread.hasMany(models.ThreadMembers); // hasmany
      Thread.hasMany(models.Comment);
    }
  }
  Thread.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'description cannot be empty',
          },
          notNull: {
            msg: 'description cannot be empty',
          },
        },
      },
      maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'maxCapacity cannot be empty',
          },
          notNull: {
            msg: 'maxCapacity cannot be empty',
          },
          min: {
            args: 2,
            msg: 'minimum capacity is 2',
          },
        },
      },
      dateToHike: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'dateToHike cannot be empty',
          },
          notNull: {
            msg: 'dateToHike cannot be empty',
          },
        },
      },
      dateFinishHike: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'dateToFinish cannot be empty',
          },
          notNull: {
            msg: 'dateToFinish cannot be empty',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Active',
      },
      authorLocation: DataTypes.GEOMETRY,
      AuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'AuthorId cannot be empty',
          },
          notNull: {
            msg: 'AuthorId cannot be empty',
          },
        },
      },
      MountainId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'MountainId cannot be empty',
          },
          notNull: {
            msg: 'MountainId cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Thread',
    }
  );
  return Thread;
};
