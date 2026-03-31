const express = require('express');
const router = express.Router();

router.use(require('./userRoutes'));
router.use(require('./authRoutes'));
router.use(require('./companyRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./jobRoutes'));
router.use(require('./applicationRoutes'));
router.use(require('./bookmarkRoutes'));
router.use(require('./documentRoutes'));
router.use(require('./profileRoutes'));

module.exports = router;