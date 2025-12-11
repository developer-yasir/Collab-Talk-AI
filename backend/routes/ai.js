const express = require('express');
const router = express.Router();

// @route    POST api/ai/message
// @desc     Send message to AI
// @access   Public
router.post('/message', (req, res) => {
  res.json({ msg: 'Send message to AI' });
});

module.exports = router;