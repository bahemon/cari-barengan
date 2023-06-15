const express = require('express')
const transactionController = require('../../Controllers/admin/transactionController')
const router = express.Router()

router.get('/transactions', transactionController.getAll)
router.get('/transactions/:id', transactionController.getById)
router.patch('/transactions/:id', transactionController.updateStatusById)

module.exports = router 