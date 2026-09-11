const pool = require('../config/db');
const getAllproperties = async (filters) => {
let query = 'SELECT p.*, c.name AS category_name FROM properties p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
const values = [];
let count = 1;
if (filters.location){
    query += ` AND LOWER(p.location) LIKE LOWER($${count})`;
    values.push(`%${filters.location}%`);
    count++;
}
if (filters.category_id){
    query += ` AND p.category_id = $${count}`;
    values.push(filters.category_id);
    count++;
}
if(filters.min_price){
    query += ` AND p.price >= $${count}`;
    values.push(filters.min_price);
    count++;
}
if(filters.max_price){
    query += ` AND p.price <= $${count}`;
    values.push(filters.max_price);
    count++;
}
query += 'ORDER BY p.id DESC';
const result = await pool.query(query, values);
return result.rows;
}
const getPropertyById = async (id) => {
    const result = await pool.query(
        'SELECT p.*, c.name AS category_name FROM properties p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [id]);

    return result.rows[0];
};
const createProperty = async ( {
    title, description, price, location, area, category_id, agent_id}) => {
    const result = await pool.query(
        'INSERT INTO properties (title, description, price, location, area, category_id, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [title, description, price, location, area, category_id, agent_id, image_url]
    );
    return result.rows[0];
};
const updateProperty = async (id, { title, description, price, location, area, category_id, agent_id}) => {
const result = await pool.query(
    'UPDATE properties SET title = $1, description = $2, price = $3, location = $4, area = $5, category_id = $6, agent_id = $7 WHERE id = $8 RETURNING *',
    [title, description, price, location, area, category_id, agent_id, id]);
return result.rows[0];
};

const deleteProperty = async (id) => {
    const result = await pool.query(
        'DELETE FROM properties WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {
    getAllproperties, getPropertyById, createProperty, updateProperty, deleteProperty
};