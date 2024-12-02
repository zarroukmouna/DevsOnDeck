const jwt = require('jsonwebtoken');
const { User, validateUser } = require('../models/UserModel');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const { email, password, firstName, lastName, orgName, state, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already taken.' });
      }
  
      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        state,
        orgName: orgName || null,
        role: role || 'dev', 
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User successfully created.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                state: user.state,
                role: user.role, 
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { registerUser, loginUser };