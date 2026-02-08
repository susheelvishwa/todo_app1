# MERN Stack To-Do List Application

A modern, responsive to-do list application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, view, update, and delete tasks with a beautiful, intuitive interface.

## 📋 Project Overview

This full-stack application demonstrates CRUD operations with a RESTful API backend and a responsive frontend. Tasks are persisted in MongoDB and the UI provides real-time feedback with smooth animations and modern design patterns.

## ✨ Features

- ✅ Create new tasks with title and optional description
- ✅ View all tasks with completion status
- ✅ Toggle task completion with visual feedback
- ✅ Delete tasks with confirmation
- ✅ Real-time statistics (total, active, completed tasks)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Modern UI with smooth animations
- ✅ Toast notifications for user actions
- ✅ Form validation
- ✅ Error handling on frontend and backend

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **Vanilla JavaScript** - DOM manipulation and API calls
- **Google Fonts (Inter)** - Typography

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MongoDB** (v4.0.0 or higher)

### Installing MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## 🚀 Installation Steps

### 1. Clone or Download the Repository
```bash
cd /path/to/todo-app
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 3. Environment Variables Setup

The `.env` file is already created in the backend directory with default values:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

If you need to modify these values, edit the `backend/.env` file.

### 4. Verify MongoDB is Running

Make sure MongoDB is running on your system:
```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"
```

If MongoDB is not running, start it:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

## 🎯 How to Run

### Starting the Backend Server

1. Open a terminal and navigate to the backend directory:
```bash
cd backend
```

2. Start the server:
```bash
npm start
```

For development with auto-restart on file changes:
```bash
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Starting the Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Open `index.html` in your browser:

**Option 1: Using a simple HTTP server (recommended)**
```bash
# If you have Python 3 installed
python3 -m http.server 3000

# If you have Python 2 installed
python -m SimpleHTTPServer 3000

# If you have Node.js http-server installed
npx http-server -p 3000
```

Then open your browser and navigate to: `http://localhost:3000`

**Option 2: Direct file opening**
Simply double-click the `index.html` file or drag it into your browser.

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/tasks
```

### Endpoints

#### 1. Get All Tasks
- **Method:** GET
- **Endpoint:** `/api/tasks`
- **Description:** Retrieves all tasks sorted by creation date (newest first)
- **Response:** Array of task objects

**Example Response:**
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "title": "Complete project documentation",
    "description": "Write comprehensive README",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### 2. Create New Task
- **Method:** POST
- **Endpoint:** `/api/tasks`
- **Description:** Creates a new task
- **Request Body:**
```json
{
  "title": "Task title (required)",
  "description": "Task description (optional)"
}
```
- **Response:** Created task object

#### 3. Update Task (Toggle Completion)
- **Method:** PUT
- **Endpoint:** `/api/tasks/:id`
- **Description:** Toggles the completion status of a task
- **Response:** Updated task object

#### 4. Delete Task
- **Method:** DELETE
- **Endpoint:** `/api/tasks/:id`
- **Description:** Deletes a task by ID
- **Response:** Success message with deleted task

### Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🧪 Testing the API

You can test the API using:

### Using cURL

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"This is a test"}'
```

**Toggle task completion:**
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

### Using Postman or Thunder Client

1. Import the endpoints listed above
2. Set the base URL to `http://localhost:5000/api/tasks`
3. Test each endpoint with appropriate request bodies

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Mobile devices:** 320px - 480px
- **Tablets:** 481px - 768px
- **Desktops:** 769px and above

The design uses a mobile-first approach with CSS media queries to ensure optimal viewing on all screen sizes.

## 🎨 Design Features

- Modern gradient background
- Glassmorphism effects
- Smooth animations and transitions
- Hover effects for interactive elements
- Toast notifications for user feedback
- Empty state when no tasks exist
- Task statistics dashboard
- Clean, intuitive interface

## 🔒 Security Features

- Input validation on both frontend and backend
- XSS protection through HTML escaping
- CORS enabled for secure cross-origin requests
- Environment variables for sensitive data
- Confirmation dialogs for destructive actions

## 📝 Assumptions Made

1. **MongoDB Connection:** The application assumes MongoDB is running locally on the default port (27017). For production, you would use a cloud MongoDB service like MongoDB Atlas.

2. **CORS Configuration:** The backend allows all origins for development. In production, you should restrict this to specific domains.

3. **No Authentication:** This is a simple demo application without user authentication. In a real-world scenario, you would add user authentication and associate tasks with specific users.

4. **Single User:** The application doesn't differentiate between users. All tasks are shared.

5. **No Task Editing:** The current implementation only allows toggling completion status. Full task editing (title/description) could be added as an enhancement.

6. **Local Storage:** All data is stored in MongoDB. No client-side caching or offline support is implemented.

7. **Simple Validation:** Basic validation is implemented. More complex validation rules could be added based on requirements.

## 🚧 Future Enhancements

Potential improvements for this application:

- User authentication and authorization
- Task categories and tags
- Due dates and reminders
- Task priority levels
- Search and filter functionality
- Drag-and-drop task reordering
- Dark/light theme toggle
- Export tasks to CSV/PDF
- Task sharing and collaboration
- Progressive Web App (PWA) support

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:** Make sure MongoDB is running:
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:** Either kill the process using port 5000 or change the PORT in `.env` file.

### CORS Error
**Problem:** `Access to fetch at 'http://localhost:5000/api/tasks' from origin 'null' has been blocked by CORS policy`

**Solution:** Make sure you're running the frontend through an HTTP server, not opening the HTML file directly.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a demonstration of MERN stack development best practices.

---

**Happy Task Managing! 🎉**
