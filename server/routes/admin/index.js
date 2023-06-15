const express = require('express')
const router = express.Router()
const article = require('./articles')
const store = require('./stores')
const product = require('./products')
const transaction = require('./transactions')
const categories = require('./categories')
const mountains = require('./mountains')

router.use(mountains)
router.use(article)
router.use(categories)
router.use(store)
router.use(product)
router.use(transaction)

module.exports = router