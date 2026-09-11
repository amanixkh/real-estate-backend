const pool = require('../config/db');
const addImage = async (property_id, image_url) => {
    const result = await pool.query(
        'INSERT INTO property_images (property_id, image_url) VALUES ($1, $2) RETURNING *',
        [property_id, image_url]
    );
    return result.rows[0];
};
const getPropertyImages = async (property_id) => {
    const result = await pool.query(
        'SELECT * FROM property_images WHERE property_id = $1',
        [property_id]);
    return result.rows;
};
const deleteImage = async (id) => {
    const result = await pool.query(
        'DELETE FROM property_images WHERE id = $1 RETURNING *',
        [id]);
    return result.rows[0];
};
module.exports = {
    addImage, getPropertyImages, deleteImage
};
