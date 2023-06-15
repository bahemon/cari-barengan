const { TransactionDetail } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function bulkInsertTransactionDetail() {
    await queryInterface.bulkDelete('TransactionDetails', {}, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  
    await TransactionDetail.bulkCreate(
      [
        {
            "price": 45000,
            "TransactionId": 1,
            "ProductId": 1,
            "amount": 2,
            "StoreId": 1
          },
          {
            "price": 15000,
            "TransactionId": 1,
            "ProductId": 2,
            "amount": 2,
            "StoreId": 1
          },
          {
            "price": 15000,
            "TransactionId": 2,
            "ProductId": 2,
            "amount": 1,
            "StoreId": 1
          },
          {
            "price": 20000,
            "TransactionId": 3,
            "ProductId": 4,
            "amount": 1,
            "StoreId": 1
          }
      ]
    )
  }
  module.exports = bulkInsertTransactionDetail