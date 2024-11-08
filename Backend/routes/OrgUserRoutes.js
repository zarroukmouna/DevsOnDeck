const express = require('express');
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/OrgUserController');
const router = express.Router();

router.post(
  '/register',
  [
    check('orgName', 'Organization name is required').notEmpty(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('address', 'Address is required').notEmpty(),
    check('state', 'State is required').notEmpty()
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
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('userType', 'User type is required and should be "org"').notEmpty().isIn(['org'])
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





