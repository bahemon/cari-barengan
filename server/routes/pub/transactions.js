const express = require('express');
const TransactionController = require('../../Controllers/pub/TransactionController');
const router = express.Router();

router.post('/pub/transactions', TransactionController.createTransaction);
module.exports = router;
