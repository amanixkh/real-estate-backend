const express = require('express');
const router = express.Router();
const { listUsers, changeUserRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');

router.get('/', authMiddleware, checkPermission('manage_users'), listUsers);
router.patch('/:id/role', authMiddleware, checkPermission('manage_users'), changeUserRole);

module.exports = router;