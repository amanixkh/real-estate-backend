const pool = require('../config/db');

async function getAgentAnalytics(agentId, roleId) {
    const result = await pool.query(
        `SELECT
            (SELECT COUNT(*)
             FROM properties
             WHERE (SELECT name = 'admin' FROM roles WHERE id = $2) OR agent_id = $1) AS "totalProperties",
            (SELECT COUNT(*)
             FROM favorites
             JOIN properties ON properties.id = favorites.property_id
             WHERE (SELECT name = 'admin' FROM roles WHERE id = $2) OR properties.agent_id = $1) AS "totalFavorites",
            (SELECT COUNT(*)
             FROM inquiries
             JOIN properties ON properties.id = inquiries.property_id
             WHERE (SELECT name = 'admin' FROM roles WHERE id = $2) OR properties.agent_id = $1) AS "totalInquiries",
            (SELECT COUNT(*)
             FROM inquiries
             JOIN properties ON properties.id = inquiries.property_id
             WHERE inquiries.status = 'Pending'
             AND ((SELECT name = 'admin' FROM roles WHERE id = $2) OR properties.agent_id = $1)) AS "pendingInquiries",
            (SELECT COUNT(*)
             FROM inquiries
             JOIN properties ON properties.id = inquiries.property_id
             WHERE inquiries.status IN ('Approved', 'Rejected')
             AND ((SELECT name = 'admin' FROM roles WHERE id = $2) OR properties.agent_id = $1)) AS "completedInquiries"`,
        [agentId, roleId]
    );

    return result.rows[0];
}

module.exports = { getAgentAnalytics };