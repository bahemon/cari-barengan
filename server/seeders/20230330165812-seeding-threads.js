'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Threads', require('../../data/threads.json').map(thread => {
      thread.authorLocation = Sequelize.fn(
        'ST_GeomFromText',
        `POINT(${thread.lattitude} ${thread.longitude})`
      )
      thread.createdAt = new Date()
      thread.updatedAt = new Date()
      delete thread.lattitude
      delete thread.longitude
      return thread
    }))
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Threads', null, {});
  }
};
