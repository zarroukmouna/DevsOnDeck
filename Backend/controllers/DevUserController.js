const User = require('../models/DevUserModel');

exports.registerUser = async (req, res) => {
    const {firstName, lastName, email, address, city, state, password } = req.body;
    console.log("Received user data:", req.body); 

    try {
        const user = new User({firstName, lastName, email, address, city, state, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error saving user:", error.message); 
        res.status(400).json({ error: error.message });
    }
};