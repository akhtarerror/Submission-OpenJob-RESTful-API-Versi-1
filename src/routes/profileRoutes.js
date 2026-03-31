const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, profileController.getProfile);
router.get('/profile/applications', authMiddleware, profileController.getApplications);
router.get('/profile/bookmarks', authMiddleware, profileController.getBookmarks);

module.exports = router;