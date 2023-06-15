'use strict';

const { hashedPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', require('../../data/users.json').map(user => {
      user.password = hashedPassword(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()
      return user
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
