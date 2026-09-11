const express = require('express');
const router = express.Router();
const { getProperties, getProperty, createProperty, updateProperty, deleteProperty, uploadPropertyImage } = require('../controllers/propertyController');
const upload = require('../middleware/upLoadMiddleware');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);
router.post('/:id/upload', upload.single('image'), uploadPropertyImage);

module.exports = router;