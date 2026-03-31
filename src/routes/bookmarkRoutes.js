const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/jobs/:jobId/bookmark', authMiddleware, bookmarkController.create);
router.get('/jobs/:jobId/bookmark/:id', authMiddleware, bookmarkController.getById);
router.delete('/jobs/:jobId/bookmark', authMiddleware, bookmarkController.remove);
router.get('/bookmarks', authMiddleware, bookmarkController.getAll);

module.exports = router;