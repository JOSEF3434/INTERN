const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

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

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    userType: String,
    password: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    type: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    balance: { type: Number, default: 0 },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

// User History Schema
const userHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    orders: [{ dish: String, price: Number, id: String }],
}, { timestamps: true });

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

// Past History Schema
const pastHistorySchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    dish: String,
    price: Number,
    id: String,
}, { timestamps: true });

const PastHistory = mongoose.model('pasthistory', pastHistorySchema);

// Message Schema
const messageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

// API Endpoints
// Signup
app.post('/api/users', async (req, res) => {
    const { name, email, userType, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, userType, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'The user is not registered' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });
        
        const userInfo = { id: user._id, name: user.name, email: user.email, userType: user.userType };
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Get User by Email
app.get('/api/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({
            name: user.name,
            email: user.email,
            userType: user.userType,
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Get User History by Email
app.get('/api/userHistory/:email', async (req, res) => {
    try {
        const userHistory = await UserHistory.findOne({ email: req.params.email });
        if (!userHistory) {
            return res.status(404).json({ orders: [] }); // Return empty orders if no history found
        }
        res.status(200).json(userHistory);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ error: 'Failed to fetch user history' });
    }
});

// Delete User
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Add Product
app.post('/api/products', async (req, res) => {
    const { name, price, image, type } = req.body;
    const newProduct = new Product({ name, price, image, type });
    try {
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to add product' });
    }
});

// Get Product Counts
app.get('/api/products/counts', async (req, res) => {
    try {
        const foodCount = await Product.countDocuments({ type: 'food' });
        const drinkCount = await Product.countDocuments({ type: 'drink' });
        const roomCount = await Product.countDocuments({ type: 'room' });
        res.status(200).json({ food: foodCount, drink: drinkCount, room: roomCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve counts' });
    }
});

// Check if Product Exists by ID
app.get('/api/products/:id/exists', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to check product existence' });
    }
});

// Get All Products
app.get('/api/products', async (req, res) => {
    try {
        const type = req.query.type;
        const products = await Product.find(type ? { type } : {});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
});

// Edit Product
app.put('/api/products/:id', async (req, res) => {
    const { price } = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, { price });
        res.status(200).json({ message: 'Product price updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Deposit Currency
app.post('/api/deposit', async (req, res) => {
    const { email, amount, userName } = req.body;
    if (amount <= 0) return res.status(400).json({ error: 'Deposit amount must be greater than zero' });

    try {
        let customer = await Customer.findOne({ email });
        if (!customer) {
            customer = new Customer({ name: userName, email, balance: amount });
            await customer.save();
            return res.status(201).json({ message: 'User created and deposit successful', balance: customer.balance });
        }
        customer.balance += amount;
        await customer.save();
        res.status(200).json({ message: 'Deposit successful', balance: customer.balance });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process deposit' });
    }
});

// Update Customer Balance
app.put('/api/customers/:email', async (req, res) => {
    const { balance } = req.body;
    try {
        const customer = await Customer.findOneAndUpdate(
            { email: req.params.email },
            { balance },
            { new: true } // Return the updated document
        );
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update balance' });
    }
});

// Get Customer by Email
app.get('/api/customers/:email', async (req, res) => {
    try {
        const customer = await Customer.findOne({ email: req.params.email });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching customer' });
    }
});

// User History Submission
app.post('/api/userHistory', async (req, res) => {
    try {
        const { email, name, dish, price, id } = req.body; // Ensure all fields are received
        let userHistory = await UserHistory.findOne({ email });
        if (userHistory) {
            userHistory.orders.push({ dish, price, id });
        } else {
            userHistory = new UserHistory({ email, name, orders: [{ dish, price, id }] });
        }
        await userHistory.save();
        res.status(201).json({ message: 'Order history updated successfully' });
    } catch (error) {
        console.error('Error saving user history:', error);
        res.status(500).json({ error: 'Failed to save user history' });
    }
});

// Past History Submission
app.post('/api/pastHistory', async (req, res) => {
    try {
        const { email, name, dish, price, id } = req.body; // Get all necessary fields
        const pastOrder = new PastHistory({ email, name, dish, price, id });
        await pastOrder.save();
        res.status(201).json({ message: 'Past history updated successfully' });
    } catch (error) {
        console.error('Error saving past history:', error);
        res.status(500).json({ error: 'Failed to save past history' });
    }
});

// Get User History by Email
app.get('/api/userHistory/:email', async (req, res) => {
    try {
        const userHistory = await UserHistory.findOne({ email: req.params.email });
        if (!userHistory) {
            return res.status(404).json({ orders: [] }); // Return empty orders if no history found
        }
        res.status(200).json(userHistory);
    } catch (error) {
        console.error('Error fetching user history:', error);
        res.status(500).json({ error: 'Failed to fetch user history' });
    }
});

// Get Order Count by Email
app.get('/api/userHistory/count/:email', async (req, res) => {
    try {
        const userHistory = await UserHistory.findOne({ email: req.params.email });
        const orderCount = userHistory ? userHistory.orders.length : 0;
        res.status(200).json({ count: orderCount });
    } catch (error) {
        console.error('Error fetching order count:', error);
        res.status(500).json({ error: 'Failed to fetch order count' });
    }
});

app.get('/api/userhistory/summary', async (req, res) => {
    try {
      // Replace this with your database logic to fetch user history
      const userHistories = await UserHistory.find(); 
  
      const totalOrders = userHistories.reduce((sum, history) => sum + history.orders.length, 0);
      const totalPrice = userHistories.reduce(
        (sum, history) =>
          sum + history.orders.reduce((orderSum, order) => orderSum + order.price, 0),
        0
      );
  
      res.status(200).json({ totalOrders, totalPrice });
    } catch (error) {
      console.error('Error fetching user history summary:', error);
      res.status(500).json({ error: 'Failed to fetch user history summary' });
    }
  });
  
// Get Total Ordered Items and Total Price in User History
app.get('/api/userhistory/summary', async (req, res) => {
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
        console.error('Error fetching user history summary:', error);
        res.status(500).json({ error: 'Failed to fetch user history summary' });
    }
});


// Add this endpoint to your existing Express server code
app.get('/api/userHistories', async (req, res) => {
    try {
        const userHistories = await UserHistory.find();
        const result = userHistories.map(userHistory => ({
            name: userHistory.name,
            email: userHistory.email,
            totalPrice: userHistory.orders.reduce((sum, order) => sum + order.price, 0) // Calculate total price
        }));
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching user histories:', error);
        res.status(500).json({ error: 'Failed to fetch user histories' });
    }
});
 app.get('/api/userhistory/summary', async (req, res) => {
    try {
        const userHistories = await UserHistory.find();
        
        // Calculate total orders and total price
        const totalOrders = userHistories.reduce((sum, history) => sum + history.orders.length, 0);
        const totalPrice = userHistories.reduce(
            (sum, history) => sum + history.orders.reduce((orderSum, order) => orderSum + order.price, 0),
            0
        );

        res.status(200).json({ totalOrders, totalPrice });
    } catch (error) {
        console.error('Error fetching user history summary:', error);
        res.status(500).json({ error: 'Failed to fetch user history summary' });
    }
});

// Assist Endpoint
app.post('/api/assist', async (req, res) => {
    const { email, message } = req.body;
    try {
        const reply = `You said: ${message}`; // Simple echo reply
        const newMessage = new Message({ email, message, reply });
        await newMessage.save();
        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error handling assist request:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get Messages by Email
app.get('/api/messages/:email', async (req, res) => {
    try {
        const messages = await Message.find({ email: req.params.email }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Hotel')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/userhistory', orderHistoryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
