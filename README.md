# Collab-Talk-AI

A full-featured MERN application with real-time chat, collaborative workspace, and AI assistance.

## 🚀 Features

- Real-time private & group chat
- Live online/offline user presence
- Smart AI assistant for summarizing, explaining, debugging, writing, and brainstorming
- Shared collaborative workspace where multiple users can edit together
- User authentication with JWT
- Dashboard with recent chats, workspaces, and activities
- Clean, modern UI with professional components

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS
- Shadcn UI
- React Router
- Zustand/Context API
- Axios
- Socket.io-client

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt
- Socket.io
- OpenAI API

## 📦 Project Structure

```
Collab-Talk/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── services/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── layouts/
    │   ├── pages/
    │   ├── contexts/
    │   ├── api/
    │   └── utils/
    └── public/
```

## 🔧 Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Collab-Talk/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/collabtalk
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Collab-Talk/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

## 🏃‍♂️ Running the Application

1. Make sure MongoDB is running on your local machine
2. Start the backend server: `npm run dev` in the `backend` directory
3. Start the frontend development server: `npm run dev` in the `frontend` directory
4. Open your browser and navigate to `http://localhost:5173`

The application will automatically reload if you make changes to the frontend code.

## 🧪 API Endpoints

- `GET /` - Basic API status check
- `GET /health` - Health check endpoint
- `POST /api/users` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth` - Get logged in user
- `GET /api/messages` - Get messages
- `GET /api/conversations` - Get conversations
- `GET /api/workspaces` - Get workspaces
- `POST /api/ai/message` - Send message to AI

## 🤖 AI Assistant Integration

The application integrates with OpenAI API for:
- Code explanation and debugging
- Content summarization
- Writing assistance
- Brainstorming support

To use this feature, add your OpenAI API key to the environment variables.

## 📱 Features Coming Soon

- Video and voice calling
- File sharing
- Advanced workspace collaboration tools
- Notification system
- Dark/light mode toggle
- User presence indicators