'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', require('../../data/comments.json').map(comment => {
      comment.createdAt = new Date()
      comment.updatedAt = new Date()
      return comment
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
