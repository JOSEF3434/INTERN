//orderhistorycontroller
const UserHistory = require('../models/UserHistory');

// Get User History by Email
exports.getUserHistory = async (req, res) => {
    try {
        const userHistory = await UserHistory.findOne({ email: req.params.email });
        if (!userHistory) return res.status(404).json({ orders: [] });
        res.status(200).json(userHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user history' });
    }
};

// Summary of Total Orders and Total Price
exports.getSummary = async (req, res) => {
    try {
        const userHistories = await UserHistory.find();
        const totalOrders = userHistories.reduce((sum, history) => sum + history.orders.length, 0);
        const totalPrice = userHistories.reduce(
            (sum, history) =>
                sum + history.orders.reduce((orderSum, order) => orderSum + order.price, 0),
            0
        );
        res.status(200).json({ totalOrders, totalPrice });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user history summary' });
    }
};

// Get User History Count by Email
exports.getUserHistoryCount = async (req, res) => {
    try {
        const userHistory = await UserHistory.findOne({ email: req.params.email });
        if (!userHistory) return res.status(404).json({ count: 0 });
        const orderCount = userHistory.orders.length;
        res.status(200).json({ count: orderCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user history count' });
    }
};

