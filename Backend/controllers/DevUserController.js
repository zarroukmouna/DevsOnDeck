const User = require('../models/DevUserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { validationResult } = require('express-validator');  

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, address, state, password } = req.body;

    try {
        const user = new User({ firstName, lastName, email, address, state, password });
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({ message: 'User created successfully', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

