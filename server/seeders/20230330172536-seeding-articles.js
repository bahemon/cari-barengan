'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', require('../../data/articles.json').map(article => {
      article.createdAt = new Date()
      article.updatedAt = new Date()
      return article
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
