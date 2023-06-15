'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', require('../../data/productCategories.json').map(category => {
      category.createdAt = new Date()
      category.updatedAt = new Date()
      return category
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
