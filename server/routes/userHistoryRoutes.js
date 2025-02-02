const express = require('express');
const router = express.Router();
const userHistoryController = require('../controllers/userHistoryController');

// Add a new order to user history
router.post('/', userHistoryController.createUserHistory);

// Search user histories by name
router.get('/search', userHistoryController.searchUserHistories);

// Check if a dish is already ordered
router.get('/isOrdered/:id', userHistoryController.isDishOrdered);

// Get all taken dishes
router.get('/takenDishes', userHistoryController.getTakenDishes);

// Fetch all user histories
router.get('/', userHistoryController.getAllUserHistories);

// Fetch user history by email
router.get('/:email', userHistoryController.getUserHistory);

// Get total order count by email
router.get('/count/:email', userHistoryController.getOrderCount);

// Get order summary by email
router.get('/summary/:email', userHistoryController.getOrderSummary);

// Delete user history by email
router.delete('/:email', userHistoryController.deleteUserHistory);


module.exports = router;
