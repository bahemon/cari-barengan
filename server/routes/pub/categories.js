const express = require('express');
const CategoryController = require('../../Controllers/pub/categoryController');
const router = express.Router();

router.get('/pub/categories', CategoryController.getAll);
router.get('/pub/categories/:id', CategoryController.getById);

module.exports = router;
