const express = require('express');
const router = express.Router();

// @route    GET api/conversations
// @desc     Get all conversations
// @access   Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all conversations' });
});

module.exports = router;