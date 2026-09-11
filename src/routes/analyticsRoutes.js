const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');
const { getAgentAnalytics } = require('../controllers/analyticsController');

router.get('/', authMiddleware, checkPermission('view_analytics'), getAgentAnalytics);

module.exports = router;