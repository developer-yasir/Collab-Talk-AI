import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Check, CheckCheck, MessageSquare } from 'lucide-react';
import axios from 'axios';

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useAuth();

  // Mock data for initial state
  useEffect(() => {
    // Simulate loading conversations
    setConversations([
      {
        _id: '1',
        participants: [
          { _id: '1', name: 'John Doe', avatar: '', email: 'john@example.com', status: 'online' },
          { _id: user?._id, name: user?.name, avatar: '', email: user?.email, status: 'online' }
        ],
        lastMessage: { content: 'Hey, how are you doing?', createdAt: '2023-01-01T10:00:00Z' },
        lastMessageAt: '2023-01-01T10:00:00Z'
      },
      {
        _id: '2',
        participants: [
          { _id: '2', name: 'Jane Smith', avatar: '', email: 'jane@example.com', status: 'away' },
          { _id: user?._id, name: user?.name, avatar: '', email: user?.email, status: 'online' }
        ],
        lastMessage: { content: 'Can you review the document?', createdAt: '2023-01-01T09:30:00Z' },
        lastMessageAt: '2023-01-01T09:30:00Z'
      },
      {
        _id: '3',
        participants: [
          { _id: '3', name: 'Team Alpha', avatar: '', email: '', status: 'online' },
          { _id: '4', name: 'Bob Johnson', avatar: '', email: 'bob@example.com', status: 'offline' },
          { _id: user?._id, name: user?.name, avatar: '', email: user?.email, status: 'online' }
        ],
        lastMessage: { content: 'Meeting at 3 PM today', createdAt: '2023-01-01T08:15:00Z' },
        lastMessageAt: '2023-01-01T08:15:00Z',
        isGroup: true
      }
    ]);
  }, [user]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle marking messages as read when conversation is active
  useEffect(() => {
    if (activeConversation && messages.length > 0) {
      const unreadMessages = messages.filter(
        msg => !msg.read && msg.sender._id !== user._id
      );

      if (unreadMessages.length > 0) {
        // Mark all unread messages in this conversation as read
        const conversationId = activeConversation._id;
        axios.put(`${process.env.VITE_API_URL}/messages/${conversationId}/read`, {}, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }).catch(err => console.error('Error marking messages as read:', err));
      }
    }
  }, [activeConversation, messages, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle socket events
  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('message:receive', (messageData) => {
        setMessages(prev => [...prev, messageData]);
      });

      // Listen for typing indicators
      socket.on('typing:start', (data) => {
        setIsTyping(true);
      });

      socket.on('typing:stop', (data) => {
        setIsTyping(false);
      });

      // Listen for user status updates
      socket.on('user:status', (data) => {
        setConversations(prev => prev.map(conv => {
          const updatedParticipants = conv.participants.map(participant =>
            participant._id === data.userId
              ? { ...participant, status: data.status }
              : participant
          );
          return { ...conv, participants: updatedParticipants };
        }));
      });

      return () => {
        socket.off('message:receive');
        socket.off('typing:start');
        socket.off('typing:stop');
        socket.off('user:status');
      };
    }
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !activeConversation) return;

    const messageData = {
      _id: Date.now().toString(),
      content: newMessage,
      sender: { _id: user._id, ...user },
      conversationId: activeConversation._id,
      createdAt: new Date().toISOString(),
      read: false
    };

    // Add message to local state (optimistic update)
    setMessages(prev => [...prev, messageData]);

    // Send message via socket
    socket.emit('message:send', {
      receiverId: activeConversation.participants.find(p => p._id !== user._id)?._id,
      message: messageData,
      senderId: user._id
    });

    // Save message to database
    axios.post(`${import.meta.env.VITE_API_URL}/messages`, {
      receiver: activeConversation.participants.find(p => p._id !== user._id)?._id,
      content: newMessage,
      conversationId: activeConversation._id
    }, {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    }).catch(err => console.error('Error saving message:', err));

    // Clear input
    setNewMessage('');

    // Simulate typing indicator
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleStartTyping = () => {
    if (activeConversation && newMessage.trim() !== '') {
      socket.emit('typing:start', {
        receiverId: activeConversation.participants.find(p => p._id !== user._id)?._id,
        senderId: user._id
      });
    }
  };

  const handleStopTyping = () => {
    socket.emit('typing:stop', {
      receiverId: activeConversation.participants.find(p => p._id !== user._id)?._id,
      senderId: user._id
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (conv.isGroup && conv.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          </div>
          <div className="mt-3 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const otherParticipant = conversation.participants.find(p => p._id !== user._id);
            const lastMessage = conversation.lastMessage?.content || 'No messages yet';

            return (
              <div
                key={conversation._id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeConversation?._id === conversation._id ? 'bg-primary-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {otherParticipant?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      otherParticipant?.status === 'online' ? 'bg-green-500' :
                      otherParticipant?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.isGroup ? conversation.name : otherParticipant?.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessageAt ? formatTime(conversation.lastMessageAt) : ''}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-white font-medium">
                      {activeConversation.isGroup
                        ? activeConversation.name?.charAt(0).toUpperCase()
                        : activeConversation.participants.find(p => p._id !== user._id)?.name?.charAt(0).toUpperCase()
                      }
                    </span>
                  </div>
                  {!activeConversation.isGroup && (
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      activeConversation.participants.find(p => p._id !== user._id)?.status === 'online' ? 'bg-green-500' :
                      activeConversation.participants.find(p => p._id !== user._id)?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {activeConversation.isGroup
                      ? activeConversation.name
                      : activeConversation.participants.find(p => p._id !== user._id)?.name
                    }
                  </h3>
                  <p className="text-sm text-gray-500">
                    {!activeConversation.isGroup && activeConversation.participants.find(p => p._id !== user._id)?.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Phone className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Video className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${message.sender._id === user._id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
                        message.sender._id === user._id
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className={`flex items-center justify-end mt-1 text-xs ${
                        message.sender._id === user._id ? 'text-primary-200' : 'text-gray-500'
                      }`}>
                        <span>{formatTime(message.createdAt)}</span>
                        {message.sender._id === user._id && (
                          <span className="ml-1">
                            {message.read ? (
                              <CheckCheck className="h-3 w-3 inline" />
                            ) : (
                              <Check className="h-3 w-3 inline" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      if (e.target.value.trim() !== '') {
                        handleStartTyping();
                      } else {
                        handleStopTyping();
                      }
                    }}
                    onBlur={handleStopTyping}
                  />
                </div>
                <button
                  type="submit"
                  className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Choose a conversation from the sidebar to start chatting with your team.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;