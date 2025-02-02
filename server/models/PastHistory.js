const mongoose = require('mongoose');

const pastHistorySchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        orders: [
            {
                dish: { type: String, required: true },
                price: { type: Number, required: true },
                id: { type: String, required: true },
                date: { type: Date, default: Date.now }, // Include order date
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('PastHistory', pastHistorySchema);
