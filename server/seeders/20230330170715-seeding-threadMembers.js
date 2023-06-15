'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ThreadMembers', require('../../data/threadMembers.json').map(threadMember => {
      threadMember.createdAt = new Date()
      threadMember.updatedAt = new Date()
      return threadMember
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ThreadMembers', null, {});
  }
};
