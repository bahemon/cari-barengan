const express = require('express');
const articleController = require('../../Controllers/admin/articleController');
const router = express.Router();

router.get('/pub/articles', articleController.getAll);
router.get('/pub/articles/:id', articleController.getById);

module.exports = router;
