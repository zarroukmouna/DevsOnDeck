const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); 
const { validationResult } = require('express-validator');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { orgName, firstName, lastName, email, state, password, userType } = req.body;

    try {
       
        const user = new User({
            firstName,
            lastName,
            email,
            state,
            password,
            orgName: userType === 'org' ? orgName : undefined, 
        });

        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userType } = req.body;

    try {
        const user = await User.findOne({ email, userType });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
