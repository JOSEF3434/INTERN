const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    userType: String,
    password: String,
    userState: { type: Number, default: 1 }, // Default to 1 (active)
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
