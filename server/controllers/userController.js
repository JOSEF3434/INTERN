// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// User Signup
exports.signup = async (req, res) => {
    const { name, email, userType, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, userType, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while creating user' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not registered' });
        }

        // Check if the account is active
        if (user.userState === 0) {
            return res.status(403).json({ error: 'Account is deactivated. Please contact support.' });
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Prepare user information for response
        const userInfo = {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            userState: user.userState,
        };

        res.status(200).json(userInfo);
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Server error while logging in' });
    }
};



exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
  };

// Fetch All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Update User State
exports.updateUserState = async (req, res) => {
    const { id } = req.params;
    const { userState } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userState },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user state:', error.message);
        res.status(500).json({ error: 'Failed to update user state' });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

exports.changePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        // Validate inputs
        if (!email || !currentPassword || !newPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Log input data (for debugging purposes, remove in production)
        console.log('Change Password Request:', { email, currentPassword, newPassword });

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash and update new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error.message);

        // Check for specific errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Server error while changing password' });
    }
};


