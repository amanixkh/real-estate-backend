const propertyModel = require('../models/propertyModels');
const propertyImageModel = require('../models/propertyImgemodel');
const getProperties = async (req, res) => {
    try {
        const properties = await propertyModel.getAllProperties(req.query);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get properties',
            error: error.message });
    }
};
const getProperty = async (req, res) => {
    try {
        const property = await propertyModel.getPropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: 'Property not found' });
        }
        const images = await propertyImageModel.getPropertyImages(req.params.id);
        res.status(200).json({ ...property, images });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get property',
            error: error.message });
    }
};
const createProperty = async (req, res) => {
    try {
        const { title, description, price, location, city, area, category_id, agent_id } = req.body;
        if (!title || !price || !location) {
            return res.status(400).json({
                message: 'Title, price, and location are required' });
        }
        const property = await propertyModel.createProperty({ title, description, price, location: location || city, area, category_id, agent_id });
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create property',
            error: error.message });
    }
};
const updateProperty = async (req, res) => {
    try {
        const property = await propertyModel.updateProperty(req.params.id, {
            ...req.body,
            location: req.body.location || req.body.city
        });
        if (!property) {
            return res.status(404).json({
                message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update property',
            error: error.message });
    }
};
const deleteProperty = async (req, res) => {
    try {
        const property = await propertyModel.deleteProperty(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: 'Property not found' });
        }
        res.status(200).json({
            message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete property',
            error: error.message });
    }
};
const uploadPropertyImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'image is required'});
             }
        const property = await propertyModel.getPropertyById(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: 'Property not found' });
        }
        const image = await propertyImageModel.addImage(req.params.id, `/uploads/properties/${req.file.filename}`);
        res.status(201).json({
            message: 'Image uploaded successfully',
            image});
    } catch (error) {
        res.status(500).json({
            message: 'Failed to upload image',
            error: error.message  });
    }
};
const deletePropertyImage = async (req, res) => {
    try {
        const image = await propertyImageModel.deleteImage(req.params.image_id);
        res.status(200).json({
            message: 'Image deleted successfully',
            image
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete image',
            error: error.message
        });
    }
};
module.exports = {getProperties, getProperty, createProperty, updateProperty, deleteProperty, uploadPropertyImage
    , deletePropertyImage
};
