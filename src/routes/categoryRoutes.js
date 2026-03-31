const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, categorySchema } = require('../validators/categoryValidator');

router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);
router.post('/categories', authMiddleware, validate(categorySchema), categoryController.create);
router.put('/categories/:id', authMiddleware, validate(categorySchema), categoryController.update);
router.delete('/categories/:id', authMiddleware, categoryController.remove);

module.exports = router;