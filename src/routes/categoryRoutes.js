const express = require('express');
const router = express.Router();

const { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', authMiddleware, checkPermission('manage_categories'), createCategory);
router.put('/:id', authMiddleware, checkPermission('manage_categories'), updateCategory);
router.delete('/:id', authMiddleware, checkPermission('manage_categories'), deleteCategory);

module.exports = router;