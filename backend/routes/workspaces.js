const express = require('express');
const router = express.Router();

// @route    GET api/workspaces
// @desc     Get all workspaces
// @access   Public
router.get('/', (req, res) => {
  res.json({ msg: 'Get all workspaces' });
});

module.exports = router;