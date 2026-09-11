const category = require('../models/categoryModels');
const getAllCategories = async (req, res) => {
    try {
        const categories = await category.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get categories',
             error: error.message });
    }
};
const getCategory= async (req, res) => {
    try{
        const category = await category.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({
                 message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to get category',
             error: error.message });
    }
};
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: 'Name is required' });
            }
     const category = await category.createCategory(name);
    res.status(201).json(category);
        } catch (error) {
    res.status(500).json({
            message: 'Failed to create category',
             error: error.message });
    }
};
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await category.updateCategory(req.params.id, name);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update category',
             error: error.message });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const category = await category.deleteCategory(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found' });
        }
        res.status(200).json({
            message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete category',
             error: error.message });
    }
};
module.exports = { getAllCategories,getCategory,createCategory,updateCategory,deleteCategory
};
