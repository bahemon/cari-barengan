'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stores', require('../../data/stores.json').map(store => {
      store.createdAt = new Date()
      store.updatedAt = new Date()
      return store
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  }
};
