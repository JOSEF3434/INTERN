//orderhistoryroute
const express = require('express');
const { getUserHistory, getSummary, getUserHistoryCount } = require('../controllers/orderHistoryController');
const router = express.Router();

router.get('/history/:email', getUserHistory);
router.get('/summary', getSummary);
router.get('/count/:email', getUserHistoryCount);  // Add this route for count

module.exports = router;
