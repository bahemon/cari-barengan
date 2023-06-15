const express = require('express')
const MountainController = require('../../Controllers/admin/mountainController')
const router = express.Router()

router.get('/mountains', MountainController.getAll)

module.exports = router