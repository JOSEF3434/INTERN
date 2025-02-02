// routes/productRoutes.js
const express = require('express');
const { addProduct , getProducts, getProductCounts, editProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Add a new product
router.post('/products', addProduct);

// Get all products
router.get('/', getProducts);

// Get product counts
router.get('/counts', getProductCounts);

// Edit a product's price
router.put('/:id', editProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
