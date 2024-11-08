const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const config = require('../config/config');
const DevUser = require('../models/DevUserModel'); 
const OrgUser = require('../models/OrgUserModel');
const { validationResult } = require('express-validator'); 

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '1d' });
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userType } = req.body;

    console.log("Tentative de connexion avec l'email:", email); 

    try {
        let user;

        if (userType === 'dev') {
            user = await DevUser.findOne({ email });
        } else if (userType === 'org') {
            user = await OrgUser.findOne({ email });
        }

        if (!user) {
            console.log("Utilisateur non trouvé pour l'email:", email); 
            return res.status(401).json({ message: 'Email ou mot de passe invalide' });
        }

        const isMatch = await user.matchPassword(password);
        console.log(`Statut de la correspondance du mot de passe pour ${email}: ${isMatch}`); 

        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe invalide' });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error("Erreur de connexion:", error); 
        res.status(400).json({ error: error.message });
    }
};
