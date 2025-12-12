const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middlewares/auth');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// @route    GET api/conversations
// @desc     Get all user conversations
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
    .populate({
      path: 'participants',
      select: 'name email avatar status'
    })
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'sender',
        select: 'name avatar email'
      }
    })
    .sort({ lastMessageAt: -1 });

    res.json(conversations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/conversations
// @desc     Create or get a private conversation
// @access   Private
router.post('/private', auth, async (req, res) => {
  const { userId } = req.body;

  try {
    // Validate that userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    // Check if a conversation already exists between the two users
    let conversation = await Conversation.findOne({
      type: 'private',
      participants: { $all: [req.user.id, userId] },
      isGroup: false
    });

    if (conversation) {
      // If conversation exists, return it
      conversation = await Conversation.findById(conversation._id)
        .populate('participants', 'name email avatar status');

      return res.json(conversation);
    }

    // If conversation doesn't exist, create a new one
    conversation = new Conversation({
      participants: [req.user.id, userId],
      type: 'private',
      isGroup: false
    });

    await conversation.save();

    conversation = await Conversation.findById(conversation._id)
      .populate('participants', 'name email avatar status');

    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/conversations/group
// @desc     Create a group conversation
// @access   Private
router.post('/group', auth, async (req, res) => {
  const { name, participants } = req.body;

  try {
    // Validate that all participant IDs are valid ObjectIds
    const invalidParticipantIds = participants.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidParticipantIds.length > 0) {
      return res.status(400).json({ msg: 'Invalid participant IDs' });
    }

    // Ensure the current user is included in the group
    if (!participants.includes(req.user.id.toString())) {
      participants.push(req.user.id);
    }

    const groupConversation = new Conversation({
      name,
      participants,
      type: 'group',
      isGroup: true
    });

    const conversation = await groupConversation.save();

    // Populate the participants
    await conversation.populate('participants', 'name email avatar status');

    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/conversations/:id/add-participant
// @desc     Add a participant to a group conversation
// @access   Private
router.put('/:id/add-participant', auth, async (req, res) => {
  const { participantId } = req.body;

  try {
    // Validate that conversation ID and participant ID are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid conversation ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(participantId)) {
      return res.status(400).json({ msg: 'Invalid participant ID' });
    }

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' });
    }

    // Check if user is the admin (creator) of the group
    if (!conversation.participants.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Add participant if not already in the conversation
    if (!conversation.participants.includes(participantId)) {
      conversation.participants.push(participantId);
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/conversations/:id/remove-participant
// @desc     Remove a participant from a group conversation
// @access   Private
router.put('/:id/remove-participant', auth, async (req, res) => {
  const { participantId } = req.body;

  try {
    // Validate that conversation ID and participant ID are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid conversation ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(participantId)) {
      return res.status(400).json({ msg: 'Invalid participant ID' });
    }

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ msg: 'Conversation not found' });
    }

    // Check if user is the admin (creator) of the group or removing themselves
    if (!conversation.participants.includes(req.user.id) && req.user.id !== participantId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Remove participant
    conversation.participants = conversation.participants.filter(
      id => id.toString() !== participantId
    );

    await conversation.save();

    res.json(conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;