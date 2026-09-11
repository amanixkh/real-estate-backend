const express = require('express');
const router = express.Router();
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty, uploadPropertyImage } = require('../controllers/propertyController');
const upload = require('../middleware/upLoadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', authMiddleware, checkPermission('create_property'), createProperty);
router.put('/:id', authMiddleware, checkPermission('update_property'), updateProperty);
router.delete('/:id', authMiddleware, checkPermission('delete_property'), deleteProperty);
router.post('/:id/upload', authMiddleware, checkPermission('update_property'), upload.single('image'), uploadPropertyImage);

module.exports = router;