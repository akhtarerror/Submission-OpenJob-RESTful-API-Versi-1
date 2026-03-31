const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, applicationSchema, updateApplicationSchema } = require('../validators/applicationValidator');

// ⚠️ Route spesifik HARUS di atas /:id
router.post('/applications', authMiddleware, validate(applicationSchema), applicationController.create);
router.get('/applications', authMiddleware, applicationController.getAll);
router.get('/applications/user/:userId', authMiddleware, applicationController.getByUser);
router.get('/applications/job/:jobId', authMiddleware, applicationController.getByJob);
router.get('/applications/:id', authMiddleware, applicationController.getById);
router.put('/applications/:id', authMiddleware, validate(updateApplicationSchema), applicationController.update);
router.delete('/applications/:id', authMiddleware, applicationController.remove);

module.exports = router;