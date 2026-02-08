# Quick Start Guide

## Running the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm start
```
The server will run on http://localhost:5001

### Terminal 2 - Frontend Server
```bash
cd frontend
python3 -m http.server 3000
```
Then open http://localhost:3000 in your browser

## Testing the API

### Get all tasks
```bash
curl http://localhost:5001/api/tasks
```

### Create a task
```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description"}'
```

### Toggle completion (replace TASK_ID)
```bash
curl -X PUT http://localhost:5001/api/tasks/TASK_ID
```

### Delete a task (replace TASK_ID)
```bash
curl -X DELETE http://localhost:5001/api/tasks/TASK_ID
```

## Troubleshooting

### MongoDB not running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port already in use
Edit `backend/.env` and change the PORT value to a different port (e.g., 5002)

### CORS errors
Make sure you're accessing the frontend through an HTTP server (http://localhost:3000), not by opening the HTML file directly.
