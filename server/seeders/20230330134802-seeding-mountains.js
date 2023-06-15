'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Mountains', require('../../data/mountains.json').map(mountain => {
      mountain.location = Sequelize.fn(
        'ST_GeomFromText',
        `POINT(${mountain.lattitude} ${mountain.longitude})`
      )
      mountain.createdAt = new Date()
      mountain.updatedAt = new Date()
      delete mountain.lattitude
      delete mountain.longitude
      return mountain
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Mountains', null, {})
  }
};
