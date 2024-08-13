const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const authMiddleware = require('../middleware/middleware');

const router = express.Router();
const JWT_Secret_Key = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    await user.save();
    
    res.send('User registered successfully');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).send('Invalid email or password.');

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, JWT_Secret_Key);
    res.send({ token });
});

router.post('/logout', authMiddleware, (req, res) => {
    req.user = null;
    res.send('Logged out successfully');
});

module.exports = router;
