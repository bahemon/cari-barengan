const express = require('express');
const ThreadController = require('../../Controllers/pub/threadController');
const router = express.Router();

router.get('/pub/threads', ThreadController.fetchThreads);
router.get('/pub/threads/user', ThreadController.fetchThreadsByUser);
router.get('/pub/threads/:id', ThreadController.threadById);
router.post('/pub/threads', ThreadController.createThread);
router.put('/pub/threads/:id', ThreadController.editThread);
router.delete('/pub/threads/:id', ThreadController.deleteThread);
router.post('/pub/threads/comment', ThreadController.addComment);

module.exports = router;
