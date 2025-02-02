// controllers/productController.js
const Product = require('../models/Product'); // Adjust the path to your Product model


// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, image, type } = req.body;

    // Validate the input (Optional but recommended)
    if (!name || !price || !image || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newProduct = new Product({ name, price, image, type });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
    }
};


// Get Product Counts
exports.getProductCounts = async (req, res) => {
    try {
        const foodCount = await Product.countDocuments({ type: 'food' });
        const drinkCount = await Product.countDocuments({ type: 'drink' });
        const roomCount = await Product.countDocuments({ type: 'room' });
        res.status(200).json({ food: foodCount, drink: drinkCount, room: roomCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve counts' });
    }
};

// Check if Product Exists by ID
exports.checkProductExists = async (req, res) => {
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
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const type = req.query.type;
        const products = await Product.find(type ? { type } : {});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

// Get Total Product Count by Item Type
exports.getProductCounts = async (req, res) => {
    try {
        const foodCount = await Product.countDocuments({ type: 'food' });
        const drinkCount = await Product.countDocuments({ type: 'drink' });
        const roomCount = await Product.countDocuments({ type: 'room' });
        
        res.status(200).json({
            food: foodCount,
            drink: drinkCount,
            room: roomCount,
            total: foodCount + drinkCount + roomCount // Add the total count
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product counts' });
    }
};

// Edit a Product
exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        // Find the product by its ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the price
        product.price = price;
        await product.save();

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product by its ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete the product
        await product.remove();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
