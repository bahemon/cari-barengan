const express = require('express');
const MountainController = require('../../Controllers/pub/mountainController');
const router = express.Router();

router.get('/pub/mountains', MountainController.getAll);

module.exports = router;
