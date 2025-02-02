const express = require('express');
const router = express.Router();
const adminMessageController = require('../controllers/adminMessageController');

// Add a message
router.post('/add', adminMessageController.addMessage);

// Get all messages
router.get('/', adminMessageController.getMessages);

module.exports = router;
