const { TransactionDetail, Transaction, Product, Store, User, Mountain, Profile } = require('../../models')

class transactionController {
  static async getAll(req, res, next) {
    try {
      const data = await Transaction.findAll({
        include: [{
          model: User,
          attributes: {
            exclude: ['password']
          }
        }, {
          model: TransactionDetail,
          include: [{
            model: Store,
            attributes: ['name']
          },
          {
            model: Product,
            attributes: ['name']
          }]
        }]
      })

      // if (!data) {
      //   throw { code: 404, message: 'Transaction not found' };
      // }

      res.json(data)

    } catch (err) {
      next(err)
    }
  }

  // // USERS
  // static async createTransaction(req, res, next) {
  //   try {
  //     const data = await Transaction.findAll({
  //       include: [User, {
  //         model: TransactionDetail,
  //         include: [{
  //           model: Store,
  //           attributes: ['name']
  //         },
  //         {
  //           model: Product,
  //           attributes: ['name']
  //         }]
  //       }]
  //     })

  //     res.json(data)
  //   } catch (err) {
  //     next(err)

  //   }
  // }

  static async getById(req, res, next) {
    try {
      // const transactionDetail = await TransactionDetail.findAll({
      //   include: [{
      //     model: Transaction,
      //     include: User
      //   }, Product, {
      //     model: Store,
      //     include: Mountain
      //   }],
      //   where: {
      //     TransactionId: req.params.id
      //   }
      // })

      const transactionDetail = await Transaction.findOne({
        include: [{
          model: User,
          include: Profile,
          attributes: {
            exclude: ['password']
          }
        }, {
          model: TransactionDetail,
          include: [{
            model: Store,
            attributes: ['name']
          },
          {
            model: Product,
            attributes: ['name']
          }]
        }],
        where: {
          id: req.params.id
        }
      })

      res.status(200).json(transactionDetail)

    } catch (err) {
      next(err)
    }
  }

  static async updateStatusById(req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body
      const transaction = await Transaction.findByPk(id)

      if (!transaction) {
        throw { code: 404, message: 'Transaction not found' }
      }

      await transaction.update({
        status
      })

      res.status(200).json({
        message: `Transaction status with id: ${id} has changed to ${status}`
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = transactionController
