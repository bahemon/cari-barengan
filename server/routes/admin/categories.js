const express = require('express')
const CategoryController = require('../../Controllers/admin/CategoryController')
const router = express.Router()

router.get('/categories', CategoryController.getAll)

module.exports = router