const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateRegister } = require('../middleware/authValidator');

router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;