const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orgUserSchema = new mongoose.Schema({
    orgName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    password: { type: String, required: true },
});

orgUserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

orgUserSchema.methods.matchPassword = async function(enteredPassword) {
    console.log("Comparing passwords:", enteredPassword, this.password); 
    return await bcrypt.compare(enteredPassword, this.password);
};

const OrgUser = mongoose.model('OrgUser', orgUserSchema);

module.exports = OrgUser;



