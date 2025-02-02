const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contact');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const userHistoryRoutes = require('./routes/userHistoryRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');
const pastHistoryRoutes = require('./routes/pastHistoryRoutes');
const adminMessageRouter = require('./routes/adminMessageRouter');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Hotel')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    //Router 
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/customers', customerRoutes);
    app.use('/api/userhistory', orderHistoryRoutes);
    app.use('/api/userHistory', userHistoryRoutes);
    app.use('/api/contact', contactRoutes);
    app.use('/api/pastHistory', pastHistoryRoutes);
    app.use('/api/messages', adminMessageRouter);

    
    app.use('/api/userHistory', userHistoryRoutes);
    


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

