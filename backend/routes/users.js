const express = require('express');
const router = express.Router();

// @route    GET api/users
// @desc     Get all users
// @access   Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all users' });
});

module.exports = router;