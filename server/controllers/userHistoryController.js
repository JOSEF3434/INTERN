const UserHistory = require('../models/UserHistory'); // Ensure this path is correct

// Create a new user history entry or add an order to an existing entry
exports.createUserHistory = async (req, res) => {
    try {
        const { email, name, dish, price, id, date } = req.body;

        if (!email || !name || !dish || !price || !id || !date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let userHistory = await UserHistory.findOne({ email });

        if (!userHistory) {
            userHistory = new UserHistory({ email, name, orders: [] });
        }

        userHistory.orders.push({ dish, price, id, date });
        await userHistory.save();

        res.status(201).json({ message: 'Order added successfully to user history.', userHistory });
    } catch (error) {
        console.error('Error creating user history:', error.message);
        res.status(500).json({ message: 'Failed to create user history.' });
    }
};

// Fetch all user histories
exports.getAllUserHistories = async (req, res) => {
    try {
      const userHistories = await UserHistory.find();
      if (!userHistories) {
        return res.status(404).json({ message: "No user histories found." });
      }
      res.status(200).json(userHistories);
    } catch (error) {
      console.error("Error fetching user histories:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  

// Get user history by email
exports.getUserHistory = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const userHistory = await UserHistory.findOne({ email });

        if (!userHistory) {
            return res.status(404).json({ message: 'User history not found.' });
        }

        res.status(200).json(userHistory);
    } catch (error) {
        console.error('Error fetching user history:', error.message);
        res.status(500).json({ message: 'Failed to fetch user history.' });
    }
};

// Get total order count by email
exports.getOrderCount = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const userHistory = await UserHistory.findOne({ email });

        if (!userHistory) {
            return res.status(404).json({ message: 'User history not found.' });
        }

        const orderCount = userHistory.orders.length;
        res.status(200).json({ count: orderCount });
    } catch (error) {
        console.error('Error fetching order count:', error.message);
        res.status(500).json({ message: 'Failed to fetch order count.' });
    }
};

// Get order summary (total items and total value) by email
exports.getOrderSummary = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const userHistory = await UserHistory.findOne({ email });

        if (!userHistory) {
            return res.status(404).json({ message: 'User history not found.' });
        }

        const totalItems = userHistory.orders.reduce((sum, order) => sum + (order.quantity || 1), 0);
        const totalValue = userHistory.orders.reduce(
            (sum, order) => sum + (order.quantity || 1) * order.price,
            0
        );

        res.status(200).json({ totalItems, totalValue });
    } catch (error) {
        console.error('Error fetching order summary:', error.message);
        res.status(500).json({ message: 'Failed to fetch order summary.' });
    }
};

// Check if a dish is already ordered across all users
exports.isDishOrdered = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: 'Dish ID is required.' });
      }
  
      const userHistories = await UserHistory.find({ 'orders.id': id });
  
      if (userHistories.length > 0) {
        return res.status(200).json({ isOrdered: true });
      }
  
      res.status(200).json({ isOrdered: false });
    } catch (error) {
      console.error('Error checking dish order status:', error.message);
      res.status(500).json({ message: 'Failed to check dish order status.' });
    }
  };
  
  // Get all taken dishes by ID
  exports.getTakenDishes = async (req, res) => {
    try {
      const userHistories = await UserHistory.find();
      const takenDishes = userHistories
        .flatMap((user) => user.orders.map((order) => order.id));
      res.status(200).json(takenDishes);
    } catch (error) {
      console.error('Error fetching taken dishes:', error.message);
      res.status(500).json({ message: 'Failed to fetch taken dishes.' });
    }
  };
   
// Backend: Delete User Endpoint
exports.deleteUserHistory = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const result = await UserHistory.findOneAndDelete({ email });

    if (!result) {
      return res.status(404).json({ message: 'User history not found.' });
    }

    res.status(200).json({ message: 'User history deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user history:', error.message);
    res.status(500).json({ message: 'Failed to delete user history.' });
  }
};
 
// Search user histories by name
exports.searchUserHistories = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const userHistories = await UserHistory.find({ name: { $regex: regex } });

    if (userHistories.length === 0) {
      return res.status(404).json({ message: 'No matching user histories found.' });
    }

    res.status(200).json(userHistories);
  } catch (error) {
    console.error('Error searching user histories:', error.message);
    res.status(500).json({ message: 'Failed to search user histories.' });
  }
};
