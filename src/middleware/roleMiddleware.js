function roleMiddleware(...allowedRoleIds) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!allowedRoleIds.includes(req.user.role_id)) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }

        next();
    };
}

module.exports = roleMiddleware;