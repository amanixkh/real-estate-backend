const pool = require('../config/db');

function checkPermission(permissionName) {
    return async (req, res, next) => {
        if (!req.user || !req.user.role_id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const result = await pool.query(
                `SELECT 1
                 FROM role_permissions role_permission
                 JOIN permissions permission ON permission.id = role_permission.permission_id
                 WHERE role_permission.role_id = $1 AND permission.name = $2`,
                [req.user.role_id, permissionName]
            );

            if (result.rowCount === 0) {
                return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = checkPermission;