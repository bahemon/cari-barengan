const { ThreadMembers } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertThreadMembers() {
  await queryInterface.bulkDelete('ThreadMembers', {}, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })

  await ThreadMembers.bulkCreate(
    [
      {
        "status": "Joined",
        "UserId": 2,
        "ThreadId": 1,
        "MountainId": 1
      },
      {
        "status": "Pending",
        "UserId": 3,
        "ThreadId": 1,
        "MountainId": 1
      },
      {
        "status": "Pending",
        "UserId": 4,
        "ThreadId": 1,
        "MountainId": 1
      },
      {
        "status": "Joined",
        "UserId": 2,
        "ThreadId": 2,
        "MountainId": 5
      },
      {
        "status": "Joined",
        "UserId": 3,
        "ThreadId": 2,
        "MountainId": 5
      },
      {
        "status": "Pending",
        "UserId": 4,
        "ThreadId": 2,
        "MountainId": 5
      },
      {
        "status": "Joined",
        "UserId": 2,
        "ThreadId": 3,
        "MountainId": 7
      },
      {
        "status": "Pending",
        "UserId": 3,
        "ThreadId": 3,
        "MountainId": 7
      },
      {
        "status": "Joined",
        "UserId": 4,
        "ThreadId": 3,
        "MountainId": 7
      },
      {
        "status": "Joined",
        "UserId": 2,
        "ThreadId": 4,
        "MountainId": 10
      },
      {
        "status": "Joined",
        "UserId": 3,
        "ThreadId": 4,
        "MountainId": 10
      },
      {
        "status": "Joined",
        "UserId": 4,
        "ThreadId": 4,
        "MountainId": 10
      },
      {
        "status": "Joined",
        "UserId": 2,
        "ThreadId": 5,
        "MountainId": 9
      },
      {
        "status": "Joined",
        "UserId": 3,
        "ThreadId": 5,
        "MountainId": 9
      },
      {
        "status": "Joined",
        "UserId": 4,
        "ThreadId": 5,
        "MountainId": 9
      }
    ]
  )

}

module.exports = bulkInsertThreadMembers