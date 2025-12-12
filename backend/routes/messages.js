const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// @route    GET api/messages/:conversationId
// @desc     Get messages for a conversation
// @access   Private
router.get('/:conversationId', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Validate that conversationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ msg: 'Invalid conversation ID' });
    }

    const messages = await Message.find({
      conversationId: conversationId
    })
    .populate('sender', 'name avatar email')
    .populate('receiver', 'name avatar email')
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/messages
// @desc     Save a message
// @access   Private
router.post('/', auth, async (req, res) => {
  const { receiver, content, conversationId, messageType } = req.body;

  try {
    // Validate that receiver and conversationId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(receiver)) {
      return res.status(400).json({ msg: 'Invalid receiver ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ msg: 'Invalid conversation ID' });
    }

    // Create new message
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      content,
      conversationId,
      messageType: messageType || 'text'
    });

    // Save the message to the database
    const message = await newMessage.save();

    // Populate the sender information
    await message.populate('sender', 'name avatar email');

    // Update the conversation's last message
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: message._id,
        lastMessageAt: message.createdAt
      },
      { new: true }
    );

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/messages/:id/read
// @desc     Mark message as read
// @access   Private
router.put('/:id/read', auth, async (req, res) => {
  try {
    // Validate that message ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid message ID' });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/messages/:conversationId/read
// @desc     Mark all messages in conversation as read
// @access   Private
router.put('/:conversationId/read', auth, async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Validate that conversationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return res.status(400).json({ msg: 'Invalid conversation ID' });
    }

    await Message.updateMany(
      {
        conversationId: conversationId,
        receiver: req.user.id,
        read: false
      },
      {
        read: true
      }
    );

    res.json({ msg: 'All messages marked as read' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;