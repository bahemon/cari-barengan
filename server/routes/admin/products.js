const express = require('express')
const productController = require('../../Controllers/admin/productController')
const router = express.Router()
const upload = require('../../helpers/multer/config')

router.post('/products', upload.single('imageUrl'), productController.addNew)
router.get('/products/stores/:StoreId', productController.getAll)
router.get('/products/:id', productController.getById)
router.put('/products/:id', productController.updateById)
router.patch('/products/:id', productController.updateStatusById)
router.delete('/products/:id', productController.deleteById)

module.exports = router