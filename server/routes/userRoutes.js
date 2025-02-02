//userRouter
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Signup
router.post('/signup', userController.signup);

// Change Password
router.put('/change-password', userController.changePassword);

// User Login
router.post('/login', userController.login);

router.get('/:email', userController.getUserByEmail);

// Get all users
router.get('/', userController.getAllUsers);

// Update user state
router.put('/:id', userController.updateUserState);

// Delete user
router.delete('/:id', userController.deleteUser);


module.exports = router;
