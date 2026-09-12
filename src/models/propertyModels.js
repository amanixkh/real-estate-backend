const pool = require('../config/db');
const getAllProperties = async (filters = {}) => {
    let query = 'SELECT p.*, c.name AS category_name FROM properties p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const values = [];
    let count = 1;

    const city = filters.city || filters.location;
    const category = filters.category || filters.category_id;
    const type = filters.type;

    if (city) {
        query += ` AND LOWER(p.location) LIKE LOWER($${count})`;
        values.push(`%${city}%`);
        count++;
    }
    if (category) {
        if (/^\d+$/.test(String(category))) {
            query += ` AND p.category_id = $${count}`;
        } else {
            query += ` AND LOWER(c.name) = LOWER($${count})`;
        }
        values.push(category);
        count++;
    }
    if (type) {
        query += ` AND LOWER(c.name) = LOWER($${count})`;
        values.push(type);
        count++;
    }
    if (filters.minPrice || filters.min_price) {
        query += ` AND p.price >= $${count}`;
        values.push(filters.minPrice || filters.min_price);
        count++;
    }
    if (filters.maxPrice || filters.max_price) {
        query += ` AND p.price <= $${count}`;
        values.push(filters.maxPrice || filters.max_price);
        count++;
    }
    query += ' ORDER BY p.id DESC';
    const requestedLimit = Number.parseInt(filters.limit, 10);
    const page = Number.parseInt(filters.page, 10);
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
        ? requestedLimit
        : (Number.isInteger(page) && page > 0 ? 10 : undefined);
    if (Number.isInteger(limit) && limit > 0) {
        query += ` LIMIT $${count}`;
        values.push(Math.min(limit, 100));
        count++;
        if (Number.isInteger(page) && page > 0) {
            query += ` OFFSET $${count}`;
            values.push((page - 1) * Math.min(limit, 100));
        }
    }

    const result = await pool.query(query, values);
    return result.rows;
};
const getPropertyById = async (id) => {
    const result = await pool.query(
        'SELECT p.*, c.name AS category_name FROM properties p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1', [id]);

    return result.rows[0];
};
const createProperty = async ({
    title, description, price, location, area, category_id, agent_id}) => {
    const result = await pool.query(
        'INSERT INTO properties (title, description, price, location, area, category_id, agent_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, description, price, location, area, category_id, agent_id]
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
    getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty
};