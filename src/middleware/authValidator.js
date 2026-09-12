function validateRegister(req, res, next) {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('name is required');
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('email must be valid');
    }
    if (!password || typeof password !== 'string') {
        errors.push('password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

module.exports = { validateRegister };