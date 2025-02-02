const express = require('express');
const router = express.Router();
const messageController = require('./controllers/messageController');

// Route to create a new message (sent by customer or receptionist)
router.post('/message', messageController.createMessage);

// Route to get all messages for a particular user (customer)
router.get('/messages/:email', messageController.getMessages);

// Route to get all messages for the receptionist
router.get('/messages', messageController.getAllMessages);

module.exports = router;
