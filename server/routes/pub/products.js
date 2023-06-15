const express = require('express');
const productController = require('../../Controllers/pub/productController');
const router = express.Router();

router.get('/pub/products', productController.getAll);
router.get('/pub/products/:id', productController.getById);

module.exports = router;
