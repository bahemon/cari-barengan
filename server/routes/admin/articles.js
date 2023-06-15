const express = require('express')
const articleController = require('../../Controllers/admin/articleController')
const router = express.Router()
const upload = require('../../helpers/multer/config')


router.post('/articles', upload.single('imageUrl'), articleController.addNew)
router.get('/articles', articleController.getAll)
router.get('/articles/:id', articleController.getById)
router.put('/articles/:id', articleController.updateById)
router.delete('/articles/:id', articleController.deleteById)

module.exports = router