const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, companySchema } = require('../validators/companyValidator');

router.get('/companies', companyController.getAll);
router.get('/companies/:id', companyController.getById);
router.post('/companies', authMiddleware, validate(companySchema), companyController.create);
router.put('/companies/:id', authMiddleware, validate(companySchema), companyController.update);
router.delete('/companies/:id', authMiddleware, companyController.remove);

module.exports = router;