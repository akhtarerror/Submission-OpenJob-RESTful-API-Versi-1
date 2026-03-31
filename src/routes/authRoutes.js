const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate, loginSchema, refreshSchema } = require('../validators/authValidator');

router.post('/authentications', validate(loginSchema), authController.login);
router.put('/authentications', validate(refreshSchema), authController.refreshToken);
router.delete('/authentications', authMiddleware, authController.logout);

module.exports = router;