const { Store } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertStores() {
    await queryInterface.bulkDelete('Stores', {}, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })

    // await bulkInsertStores()
    await Store.bulkCreate(
      [
        {
          "name": "Sahara Outdoor",
          "address": "Sebelah basecamp Putri",
          "contactPerson": "085885939426",
          "AuthorId": 5,
          "MountainId": 1
        },
        {
          "name": "Linggarjati Outdoor",
          "address": "Sebelah basecamp Linggarjati",
          "contactPerson": "085885939426",
          "AuthorId": 4,
          "MountainId": 5
        },
        {
          "name": "Papandayan Outdoor",
          "address": "Sebelah basecamp Papandayan",
          "contactPerson": "08546464568",
          "AuthorId": 1,
          "MountainId": 3
        },
        {
          "name": "Sumbing Outdoor",
          "address": "Sebelah basecamp Sumbing",
          "contactPerson": "085674646647",
          "AuthorId": 3,
          "MountainId": 10
        },
        {
          "name": "Kawi Outdoor",
          "address": "Sebelah basecamp Kawi",
          "contactPerson": "0856441119887",
          "AuthorId": 2,
          "MountainId": 26
        }
      ]
    )
  }
  module.exports = bulkInsertStores