const express = require('express')
const storeController = require('../../Controllers/admin/storeController')
const router = express.Router()

router.post('/stores', storeController.addNew)
router.get('/stores', storeController.getAll)
router.get('/stores/:id', storeController.getById)
router.put('/stores/:id', storeController.updateById)
router.delete('/stores/:id', storeController.deleteById)

module.exports = router