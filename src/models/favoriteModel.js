const pool = require("../config/db");

// Add a property to a user's favorites
async function addFavorite(userId, propertyId) {
  const result = await pool.query(
    "INSERT INTO favorites (user_id, property_id) VALUES ($1, $2) RETURNING *",
    [userId, propertyId]
  );
  return result.rows[0];
}

// Remove a property from a user's favorites
async function removeFavorite(userId, propertyId) {
  const result = await pool.query(
    "DELETE FROM favorites WHERE user_id = $1 AND property_id = $2 RETURNING *",
    [userId, propertyId]
  );
  return result.rows[0];
}

// Get all favorites for a user
async function getFavorites(userId) {
  const result = await pool.query(
    "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
