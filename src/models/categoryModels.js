const pool = require('../config/db');
const getAllCategories = async () => {
    const result = await pool.query( 'SELECT * FROM categories ORDER BY category_id ASC');
    return result.rows;
};
const getCategoryById = async (Id) => {
    const result = await pool.query(
        'SELECT * FROM categories WHERE category_id = $1', [Id]);
   return result.rows[0];
};
const createCategory = async (name) => {
    const result = await pool.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
};
const updateCategory = async (Id, name) => {
    const result = await pool.query(
        'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, Id]);
    return result.rows[0];
};
const deleteCategory = async (Id) => {
    const result = await pool.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *', [Id]);
    return result.rows[0];
};
module.exports = {
     getAllCategories, getCategoryById,createCategory,updateCategory,deleteCategory,
};