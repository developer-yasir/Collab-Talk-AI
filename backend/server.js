const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Server } = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/db');

// Initialize app
const app = express();
const server = http.createServer(app);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ extended: false }));

// Connect to database
connectDB();

// Create Socket.io instance and attach to server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Store connected users and their socket IDs
const connectedUsers = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle user connection with user ID
  socket.on('user:connected', (userId) => {
    if (userId) {
      connectedUsers.set(userId, socket.id);
      // Broadcast to all other users that this user is online
      socket.broadcast.emit('user:status', { userId, status: 'online' });
      console.log(`User ${userId} connected with socket ${socket.id}`);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // Find and remove user from connectedUsers if they were in the map
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        // Broadcast to all other users that this user is offline
        socket.broadcast.emit('user:status', { userId, status: 'offline' });
        break;
      }
    }
  });

  // Handle private messages
  socket.on('message:send', (data) => {
    const { receiverId, message, senderId } = data;
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message:receive', {
        ...message,
        senderId,
        receiverId
      });
    }
  });

  // Handle typing indicators
  socket.on('typing:start', (data) => {
    const { receiverId, senderId } = data;
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing:start', {
        senderId
      });
    }
  });

  socket.on('typing:stop', (data) => {
    const { receiverId, senderId } = data;
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('typing:stop', {
        senderId
      });
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Collab-Talk API is running...',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/conversations', require('./routes/conversations'));
app.use('/api/workspaces', require('./routes/workspaces'));
app.use('/api/ai', require('./routes/ai'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error occurred' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;