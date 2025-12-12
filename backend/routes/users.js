const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const router = express.Router();

// Convert jwt.sign to return a promise
const jwtSign = util.promisify(jwt.sign);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    let savedUser;
    try {
      savedUser = await user.save();
    } catch (saveErr) {
      console.error('Error saving user to database:', saveErr);
      if (saveErr.name === 'ValidationError') {
        const errors = Object.values(saveErr.errors).map(err => err.message);
        return res.status(400).json({ msg: 'Validation Error', errors });
      }
      throw saveErr; // Re-throw to be caught by outer catch block
    }

    // Create payload for JWT
    const payload = {
      user: {
        id: savedUser.id
      }
    };

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ msg: 'Server configuration error: JWT_SECRET not defined' });
    }

    // Sign and return JWT
    const token = await jwtSign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' }
    );

    res.json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (err) {
    console.error('Error during user registration:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;