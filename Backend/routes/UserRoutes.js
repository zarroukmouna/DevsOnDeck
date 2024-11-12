const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/UserController');  
const router = express.Router();

router.post(
  '/register',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('state', 'State is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); 
  },
  registerUser  
);

router.post(
  '/login',
  [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); 
  },
  loginUser  
);

module.exports = router;






