const express = require('express');
const router = express.Router();
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty, uploadPropertyImage, deletePropertyImage } = require('../controllers/propertyController');
const upload = require('../middleware/upLoadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/permissionMiddleware');
const checkPropertyOwnership = require('../middleware/propertyOwnershipMiddleware');
const validateProperty = require('../middleware/propertyValidator');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', authMiddleware, checkPermission('create_property'), validateProperty, createProperty);
router.put('/:id', authMiddleware, checkPermission('update_property'), validateProperty, checkPropertyOwnership('property'), updateProperty);
router.delete('/:id', authMiddleware, checkPermission('delete_property'), checkPropertyOwnership('property'), deleteProperty);
router.post('/:id/upload', authMiddleware, checkPermission('update_property'), checkPropertyOwnership('property'), upload.single('image'), uploadPropertyImage);
router.delete('/images/:image_id', authMiddleware, checkPermission('delete_property'), checkPropertyOwnership('image'), deletePropertyImage);

module.exports = router;