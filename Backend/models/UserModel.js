const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    orgName: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    password: {
        type: String,
        required: true,
    },
    role: { 
        type: String, 
        enum: ['Admin', 'User'], 
        default: 'User' 
    }
});

const validateUser = (user) => {
    const schema = Joi.object({
        orgName: Joi.string().optional().allow(''),
        firstName: Joi.string().min(2).regex(/^[a-zA-Z]+$/).required(),
        lastName: Joi.string().min(2).regex(/^[a-zA-Z]+$/).required(),
        email: Joi.string().email().required(),
        state: Joi.string().required(),
        password: Joi.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[@$!%*?&#]/).required(),
        role: Joi.string().valid('Admin', 'User').optional() 
    });

    return schema.validate(user);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };






