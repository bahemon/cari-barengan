const express = require('express');
const AdminController = require('../../Controllers/admin/userController');
const UserController = require('../../Controllers/pub/userController');
const upload = require('../../helpers/multer/config');
const router = express.Router();

router.post('/register', AdminController.register);
router.post('/login', AdminController.login);

router.post('/pub/register', upload.single('profileImage'), UserController.register);
router.post('/pub/login', UserController.login);

module.exports = router;
