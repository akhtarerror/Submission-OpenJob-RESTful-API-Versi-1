const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validate, registerSchema } = require('../validators/userValidator');

router.post('/users', validate(registerSchema), userController.register);
router.get('/users/:id', userController.getUserById);

module.exports = router;