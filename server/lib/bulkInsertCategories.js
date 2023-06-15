const { Category } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertCategories() {
  await queryInterface.bulkDelete('Categories', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await Category.bulkCreate(
    [
      {
        "id": 1,
        "name": "Tent",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      },
      {
        "id": 2,
        "name": "Clothing",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      },
      {
        "id": 3,
        "name": "Cooking",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      },
      {
        "id": 4,
        "name": "Backpack",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      },
      {
        "id": 5,
        "name": "Sleeping support",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      },
      {
        "id": 6,
        "name": "Tracking support",
        "createdAt": "2023-04-03T13:56:32.789Z",
        "updatedAt": "2023-04-03T13:56:32.789Z"
      }
    ]
  )
}

module.exports = bulkInsertCategories