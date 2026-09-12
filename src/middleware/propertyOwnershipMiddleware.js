const pool = require('../config/db');

function checkPropertyOwnership(source) {
    return async (req, res, next) => {
        try {
            const query = source === 'image'
                ? `SELECT properties.agent_id, roles.name AS role_name
                   FROM property_images
                   JOIN properties ON properties.id = property_images.property_id
                   JOIN roles ON roles.id = $2
                   WHERE property_images.id = $1`
                : `SELECT properties.agent_id, roles.name AS role_name
                   FROM properties
                   JOIN roles ON roles.id = $2
                   WHERE properties.id = $1`;
            const identifier = source === 'image' ? req.params.image_id : req.params.id;
            const result = await pool.query(query, [identifier, req.user.role_id]);
            const resource = result.rows[0];

            if (!resource) {
                return res.status(404).json({ message: source === 'image' ? 'Image not found' : 'Property not found' });
            }
            if (resource.role_name !== 'admin' && Number(resource.agent_id) !== Number(req.user.id)) {
                return res.status(403).json({ message: 'Forbidden: you do not own this property' });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = checkPropertyOwnership;