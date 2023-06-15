const { Transaction } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertTransaction() {
    await queryInterface.bulkDelete('Transactions', {}, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  
    await Transaction.bulkCreate(
      [
        {
            "startToRent": "2023-02-05",
            "finishToRent": "2023-02-07",
            "totalFee": 0,
            "status": "Pending",
            "AuthorId": 4
          },
          {
            "startToRent": "2023-02-05",
            "finishToRent": "2023-02-07",
            "totalFee": 0,
            "status": "Paid",
            "AuthorId": 5
          },
          {
            "startToRent": "2023-02-05",
            "finishToRent": "2023-02-07",
            "totalFee": 0,
            "status": "Failed",
            "AuthorId": 6
          }
      ]
    )
  }
  module.exports = bulkInsertTransaction