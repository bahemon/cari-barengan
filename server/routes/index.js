const express = require('express')
const router = express.Router()
const user = require('./user')
const admin = require('./admin')
const pub = require('./pub')
const authentication = require('../middlewares/authentication')

router.use(user)
router.use(authentication)
router.use(admin)
router.use(pub)

module.exports = router;
