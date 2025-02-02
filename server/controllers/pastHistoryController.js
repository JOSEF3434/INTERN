// controllers/pastHistoryController.js
const PastHistory = require('../models/PastHistory'); // Ensure this path is correct

// Create a new past history entry
// controllers/pastHistoryController.js
exports.createPastHistory = async (req, res) => {
  try {
      const { email, name, dish, price, id, date } = req.body;

      if (!email || !name || !dish || !price || !id) {
          return res.status(400).json({ message: 'All fields are required except date.' });
      }

      let pastHistory = await PastHistory.findOne({ email });

      if (!pastHistory) {
          pastHistory = new PastHistory({ email, name, orders: [] });
      }

      pastHistory.orders.push({ dish, price, id, date: date || Date.now() });
      await pastHistory.save();

      res.status(201).json({ message: 'Order added successfully to past history.', pastHistory });
  } catch (error) {
      console.error('Error creating past history:', error.message);
      res.status(500).json({ message: 'Failed to create past history.', error: error.message });
  }
};

  
  
// Get past history by email (if needed)
exports.getPastHistory = async (req, res) => {
    try {
        const { email } = req.params;
        const pastHistory = await PastHistory.findOne({ email });

        if (!pastHistory) {
            return res.status(404).json({ message: 'Past history not found' });
        }

        res.status(200).json(pastHistory);
    } catch (error) {
        console.error('Error fetching past history:', error);
        res.status(500).json({ message: 'Failed to fetch past history' });
    }
};
  
// Check if a product ID exists in any user's order history
exports.isProductOrdered = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const isOrdered = await UserHistory.exists({
        'orders.id': productId, // Match any order with the given product ID
      });
  
      res.status(200).json({ isOrdered: !!isOrdered });
    } catch (error) {
      console.error('Error checking product order:', error.message);
      res.status(500).json({ message: 'Failed to check product order.', error: error.message });
    }
  };

  