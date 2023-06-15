'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThreadMembers extends Model {
    static associate(models) {
      // define association here
      ThreadMembers.belongsTo(models.Thread);
      ThreadMembers.belongsTo(models.User);
      ThreadMembers.belongsTo(models.Mountain);
    }
  }
  ThreadMembers.init(
    {
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'UserId cannot be empty',
          },
          notNull: {
            msg: 'UserId cannot be empty',
          },
        },
      },
      ThreadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'ThreadId cannot be empty',
          },
          notNull: {
            msg: 'ThreadId cannot be empty',
          },
        },
      },
      MountainId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: 'ThreadMembers',
    }
  );
  return ThreadMembers;
};
