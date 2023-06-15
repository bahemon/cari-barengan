const express = require('express');
const router = express.Router();
const products = require('./products');
const threads = require('./threads');
const transactions = require('./transactions');
const threadMember = require('./threadMember');
const mountains = require('./mountain');
const article = require('./article');
const categories = require('./categories');

router.use(categories);
router.use(products);
router.use(transactions);
router.use(threads);
router.use(threadMember);
router.use(mountains);
router.use(article);

module.exports = router;
