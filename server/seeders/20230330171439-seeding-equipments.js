'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Equipment', require('../../data/equipments.json').map(equipment => {
      equipment.createdAt = new Date()
      equipment.updatedAt = new Date()
      return equipment
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Equipment', null, {});
  }
};
