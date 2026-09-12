function validateProperty(req, res, next) {
    const { title, price, location, city } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        errors.push('title is required');
    }
    if (price === undefined || price === null || price === '' || !Number.isFinite(Number(price))) {
        errors.push('price must be a number');
    }
    if ((!location && !city) || typeof (location || city) !== 'string' || !(location || city).trim()) {
        errors.push('city is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = validateProperty;