const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const devUserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
});

devUserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

devUserSchema.methods.matchPassword = async function(enteredPassword) {
    console.log("Comparing passwords:", enteredPassword, this.password); 
    return await bcrypt.compare(enteredPassword, this.password);
};

const DevUser = mongoose.model('DevUser', devUserSchema);

module.exports = DevUser;
