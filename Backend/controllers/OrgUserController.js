const OrgUser = require('../models/OrgUserModel');
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

    const { orgName, firstName, lastName, email, address, state, password } = req.body;

    try {
        const orgUser = new OrgUser({ orgName, firstName, lastName, email, address, state, password });
        await orgUser.save();

        const token = generateToken(orgUser._id);

        res.status(201).json({ message: 'Organization user created successfully', orgUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const orgUser = await OrgUser.findOne({ email });
        if (!orgUser || !(await orgUser.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(orgUser._id);
        res.status(200).json({ message: 'Login successful', orgUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



