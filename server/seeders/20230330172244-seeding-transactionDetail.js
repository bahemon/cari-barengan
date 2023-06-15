'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TransactionDetails', require('../../data/transactionDetails.json').map(transactionDetail => {
      transactionDetail.createdAt = new Date()
      transactionDetail.updatedAt = new Date()
      return transactionDetail
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TransactionDetails', null, {});
  }
};
