const analyticsModel = require('../models/analyticsModel');

async function getAgentAnalytics(req, res) {
    try {
        const analytics = await analyticsModel.getAgentAnalytics(req.user.id, req.user.role_id);
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get analytics', error: error.message });
    }
}

module.exports = { getAgentAnalytics };