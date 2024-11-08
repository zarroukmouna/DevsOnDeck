const jwt = require('jsonwebtoken');
const config = require('../config/config');
const DevUser = require('../models/DevUserModel');  
const OrgUser = require('../models/OrgUserModel');  
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            let user;

            if (decoded.userType === 'dev') {
                user = await DevUser.findById(decoded.id).select('-password');
            } else if (decoded.userType === 'org') {
                user = await OrgUser.findById(decoded.id).select('-password');
            }

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};


module.exports = { protect };


