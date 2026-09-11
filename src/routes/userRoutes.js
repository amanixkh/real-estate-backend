const express = require('express');
const router = express.Router();
const { listUsers, changeUserRole } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', authMiddleware, roleMiddleware(1), listUsers);
router.patch('/:id/role', authMiddleware, roleMiddleware(1), changeUserRole);

module.exports = router;