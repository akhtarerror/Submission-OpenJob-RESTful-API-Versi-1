const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, jobSchema } = require('../validators/jobValidator');

// ⚠️ Route spesifik HARUS di atas /:id
router.get('/jobs/company/:companyId', jobController.getByCompany);
router.get('/jobs/category/:categoryId', jobController.getByCategory);
router.get('/jobs', jobController.getAll);
router.get('/jobs/:id', jobController.getById);
router.post('/jobs', authMiddleware, validate(jobSchema), jobController.create);
router.put('/jobs/:id', authMiddleware, validate(jobSchema), jobController.update);
router.delete('/jobs/:id', authMiddleware, jobController.remove);

module.exports = router;