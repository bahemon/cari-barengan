const { Thread } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertThreads() {
  try {
    await queryInterface.bulkDelete('Threads', {}, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })

    await Thread.bulkCreate(
      [
        {
          "description": "Butuh teman mendaki, diutamakan laki-laki dan punya tenda",
          "maxCapacity": 5,
          "dateToHike": "2023-02-05",
          "dateFinishHike": "2023-02-07",
          "status": "Active",
          "lattitude": -6.260676687588894,
          "longitude": 106.7814295081836,
          "AuthorId": 3,
          "MountainId": 1
        },
        {
          "description": "Gasss bosen nihh temen-temen pada kerja semua",
          "maxCapacity": 5,
          "dateToHike": "2023-02-05",
          "dateFinishHike": "2023-02-07",
          "status": "Active",
          "lattitude": -6.260676687588894,
          "longitude": 106.7814295081836,
          "AuthorId": 2,
          "MountainId": 5
        },
        {
          "description": "Gasss",
          "maxCapacity": 3,
          "dateToHike": "2023-02-05",
          "dateFinishHike": "2023-02-07",
          "status": "Active",
          "lattitude": -6.260676687588894,
          "longitude": 106.7814295081836,
          "AuthorId": 3,
          "MountainId": 7
        },
        {
          "description": "Gasss",
          "maxCapacity": 7,
          "dateToHike": "2023-02-05",
          "dateFinishHike": "2023-02-07",
          "status": "Active",
          "lattitude": -6.260676687588894,
          "longitude": 106.7814295081836,
          "AuthorId": 5,
          "MountainId": 10
        },
        {
          "description": "Gasss bosen nihh temen-temen pada kerja semua",
          "maxCapacity": 5,
          "dateToHike": "2023-02-05",
          "dateFinishHike": "2023-02-07",
          "status": "Active",
          "lattitude": -6.260676687588894,
          "longitude": 106.7814295081836,
          "AuthorId": 6,
          "MountainId": 9
        }
      ]
    )
  } catch (err) {
    console.log(err)

  }
}

module.exports = bulkInsertThreads