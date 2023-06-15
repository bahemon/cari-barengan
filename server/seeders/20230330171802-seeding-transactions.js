'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', require('../../data/transactions.json').map(transaction => {
      transaction.createdAt = new Date()
      transaction.updatedAt = new Date()
      return transaction
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
