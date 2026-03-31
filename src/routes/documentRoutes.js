const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/documents', documentController.getAll);
router.get('/documents/:id', documentController.getById);
router.post('/documents', authMiddleware, upload.single('document'), documentController.upload);
router.delete('/documents/:id', authMiddleware, documentController.remove);

module.exports = router;