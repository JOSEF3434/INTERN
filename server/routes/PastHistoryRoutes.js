// routes/pastHistoryRoutes.js
const express = require('express');
const router = express.Router();
const pastHistoryController = require('../controllers/pastHistoryController');

// Add a new order to past history
router.post('/', pastHistoryController.createPastHistory);

// Fetch past history by email
router.get('/:email', pastHistoryController.getPastHistory);


module.exports = router;
