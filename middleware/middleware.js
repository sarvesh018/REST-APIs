const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_Secret_Key = process.env.JWT_SECRET;


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied.');

    try {
        const decoded = jwt.verify(token, JWT_Secret_Key);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = authMiddleware;
