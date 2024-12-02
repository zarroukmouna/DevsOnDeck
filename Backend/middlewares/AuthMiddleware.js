const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.length) return next();

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        next();
    };
};

module.exports = { protect, authorize };

