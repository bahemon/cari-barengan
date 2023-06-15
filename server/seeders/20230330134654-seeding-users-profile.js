'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Profiles', require('../../data/userProfiles.json').map(profile => {
      profile.createdAt = new Date()
      profile.updatedAt = new Date()
      return profile
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Profiles', null, {});
  }
};
