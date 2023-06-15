const express = require('express');
const ThreadMemberController = require('../../Controllers/pub/threadMemberController');
const router = express.Router();

router.get('/pub/ThreadMember', ThreadMemberController.threadMembersByUser);
router.get('/pub/ThreadMember/list/:id', ThreadMemberController.threadMembersList);
router.post('/pub/ThreadMember/:id', ThreadMemberController.createThreadMember);
router.patch('/pub/ThreadMember/:id', ThreadMemberController.editThreadMember);
router.get('/pub/ThreadMember/:ThreadId', ThreadMemberController.getThreadById);

module.exports = router;
