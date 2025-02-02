const Message = require('../models/messageModel');

// Create and save a new message
exports.createMessage = async (req, res) => {
  try {
    const { email, message, role, reply } = req.body;
    const newMessage = new Message({ email, message, role, reply });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Get messages for a particular user (email)
exports.getMessages = async (req, res) => {
  try {
    const { email } = req.params;
    const messages = await Message.find({ email }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Get all conversations for the receptionist
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all messages' });
  }
};
