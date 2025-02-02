const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    role: { type: String, enum: ['customer', 'receptionist'], required: true },
    reply: { type: String },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
