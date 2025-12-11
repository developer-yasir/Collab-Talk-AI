const express = require('express');
const router = express.Router();

// @route    GET api/messages
// @desc     Get all messages
// @access   Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all messages' });
});

module.exports = router;