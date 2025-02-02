# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


project-directory/
│
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── customerController.js
│   ├── messageController.js
│   └── orderHistoryController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Customer.js
│   ├── Message.js
│   └── UserHistory.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── customerRoutes.js
│   ├── messageRoutes.js
│   └── orderHistoryRoutes.js
│
├── config/
│   └── db.js
│
├── .env
├── app.js
└── package.json


const mongoose = require('mongoose');
const User = require('../models/userModule');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserControler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const userExist = await User.findOne({ email });
      if (userExist) {
          return res.status(400).json({
              errors: [{ msg: "User already exists" }],
          });
      }

      // Hash the password using bcrypt
      const hashPassword = await bcrypt.hash(password, 12);

      // Convert the bcrypt hash to a hexadecimal representation
      const hexHash = crypto.createHash('sha256').update(hashPassword).digest('hex').slice(0, 12); // 12 hexadecimal digits

      const newUser = new User({ name, email, password: hexHash });
      const result = await newUser.save();
      result._doc.password = undefined; 
      return res.status(201).json({ success: true, ...result._doc });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
  }
};

// Other functions remain unchanged


// Get all workouts
const getusers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// Get a single workout
const getuser = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: 'Not Found' });
  }
  
  res.status(200).json(user);
};

// Create a new user
const creatuser = async (req, res) => {
  const { name, email, userType, password } = req.body;
  try {
    const user = await User.create({ name, email, userType, password });
    res.status(200).json({ mssg: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mssg: 'Error creating user', error: error.message });
  }
};

// Update a user
const updateuser = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const user = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!user) {
    return res.status(404).json({ error: 'Not Found' });
  }

  res.status(200).json({ mssg: 'User updated successfully', user });
};

// Delete a user
const deleteuser = async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: 'Not Found' });
  }

  res.status(200).json({ mssg: 'User deleted successfully' });
};

module.exports = {
  UserControler,
  creatuser,
  getuser,
  getusers,
  updateuser,
  deleteuser,
};
