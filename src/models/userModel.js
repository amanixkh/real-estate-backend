const pool = require('../config/db');

async function findUserByEmail(email) {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
}

async function findUserById(id) {
    const result = await pool.query(
        'SELECT id, name, email, role_id, created_at FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

async function createUser({ name, email, hashedPassword, roleId }) {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role_id, created_at`,
        [name, email, hashedPassword, roleId]
    );
    return result.rows[0];
}

async function getAllUsers() {
    const result = await pool.query(
        'SELECT id, name, email, role_id, created_at FROM users ORDER BY id'
    );
    return result.rows;
}

async function updateUserRole(userId, roleId) {
    const result = await pool.query(
        `UPDATE users SET role_id = $1 WHERE id = $2
         RETURNING id, name, email, role_id`,
        [roleId, userId]
    );
    return result.rows[0];
}

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    getAllUsers,
    updateUserRole,
};