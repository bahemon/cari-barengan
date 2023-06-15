const { Transaction, TransactionDetail, User, Store, Product, sequelize } = require('../../models');
const Xendit = require('xendit-node');
const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY;

class TransactionController {
  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction();
    try {
      let { startToRent, finishToRent, TransactionDetails, totalFee } = req.body;

      const transaction = await Transaction.create(
        {
          startToRent,
          finishToRent,
          AuthorId: req.user.id,
          totalFee,
          status: 'Pending',
        },
        { transaction: t }
      );

      if (!TransactionDetails) {
        throw { code: 400, message: 'Transaction details is not exists' };
      }

      // let feeCounter = 0
      TransactionDetails = TransactionDetails.map((el) => {
        // feeCounter += (el.price * el.amount)
        el.TransactionId = transaction.id;
        return el;
      });

      // feeCounter = feeCounter / 2

      await TransactionDetail.bulkCreate(TransactionDetails, { transaction: t, validate: true });

      // await Transaction.update({
      //   totalFee: feeCounter
      // }, {
      //   where: { id: transaction.id }
      // }, { transaction: t })

      // const data = await Transaction.findByPk(transaction.id)

      // console.log(transaction, "??????//////////////////////////")

      const x = new Xendit({
        secretKey: XENDIT_SECRET_KEY,
      });

      // console.log(transaction, "???????????????/")
      // console.log(feeCounter, ">>>>>>>>>>>")

      const { Invoice } = x;
      const i = new Invoice({});

      let invoice = await i.createInvoice(
        {
          externalID: Date.now().toString(),
          payerEmail: req.user.email,
          description: 'Invoice for outdoor equipment rental',
          amount: totalFee,
          customer: {
            given_names: req.user.email,
            email: req.user.email,
          },
          customerNotificationPreference: {
            invoice_created: ['email'],
          },
        },
        { transaction: t }
      );

      // res.send(invoice)

      res.status(201).json({
        message: `Transaction with invoice:${invoice.invoice_url} created`,
      });

      await t.commit();
      process.exit(0);
    } catch (err) {
      next(err);
      t.rollback();
      process.exit(1);
    }
  }
}

module.exports = TransactionController;
