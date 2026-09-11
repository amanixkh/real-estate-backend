const pool = require("../config/db");

// Create a new inquiry
async function sendInquiry(customerId, propertyId, message) {
  const result = await pool.query(
    `INSERT INTO inquiries (customer_id, property_id, message, status)
     VALUES ($1, $2, $3, 'Pending') RETURNING *`,
    [customerId, propertyId, message]
  );
  return result.rows[0];
}

// Get all inquiries
async function getAllInquiries() {
  const result = await pool.query(
    "SELECT * FROM inquiries ORDER BY created_at DESC"
  );
  return result.rows;
}

// Get a single inquiry by id
async function getInquiryById(id) {
  const result = await pool.query(
    "SELECT * FROM inquiries WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Update the status of an inquiry
async function updateInquiryStatus(id, status) {
  const result = await pool.query(
    "UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
}

// Get inquiry counts grouped by status
async function getStatistics() {
  const result = await pool.query(
    `SELECT status, COUNT(*) AS count
     FROM inquiries
     GROUP BY status`
  );
  return result.rows;
}

module.exports = {
  sendInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  getStatistics,
};
