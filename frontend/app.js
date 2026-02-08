// API configuration
// const API_URL = "https://todo-app1-3fd5.onrender.com/api/tasks";
const API_URL = "http://localhost:5001/api/tasks";

// DOM elements
const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const tasksList = document.getElementById("tasksList");
const emptyState = document.getElementById("emptyState");
const totalTasksEl = document.getElementById("totalTasks");
const activeTasksEl = document.getElementById("activeTasks");
const completedTasksEl = document.getElementById("completedTasks");
const toast = document.getElementById("toast");

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  taskForm.addEventListener("submit", handleAddTask);
});

async function fetchTasks() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = 'login.html';
      return;
    }

    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    renderTasks(tasks);
    updateStats(tasks);
  } catch (error) {
    showToast("Error loading tasks. Please try again.", "error");
    console.error("Error fetching tasks:", error);
  }
}

async function handleAddTask(e) {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();

  if (!title) {
    showToast("Please enter a task title", "error");
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const newTask = await response.json();

    taskTitleInput.value = "";
    taskDescriptionInput.value = "";

    fetchTasks();
    showToast("Task added successfully!", "success");
  } catch (error) {
    showToast("Error adding task. Please try again.", "error");
    console.error("Error adding task:", error);
  }
}

async function toggleTask(id, currentStatus) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        completed: !currentStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    fetchTasks();
    showToast(
      currentStatus ? "Task marked as active" : "Task completed!",
      "success",
    );
  } catch (error) {
    showToast("Error updating task. Please try again.", "error");
    console.error("Error toggling task:", error);
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    fetchTasks();
    showToast("Task deleted successfully", "success");
  } catch (error) {
    showToast("Error deleting task. Please try again.", "error");
    console.error("Error deleting task:", error);
  }
}

function renderTasks(tasks) {
  if (tasks.length === 0) {
    tasksList.innerHTML = "";
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  tasksList.innerHTML = tasks
    .map(
      (task) => `
    <div class="task-item ${task.completed ? "completed" : ""}" data-id="${task._id}">
      <div class="task-header">
        <div
          class="task-checkbox ${task.completed ? "checked" : ""}"
          onclick="toggleTask('${task._id}', ${task.completed})"
        ></div>
        <div class="task-content">
          <h3 class="task-title">${escapeHtml(task.title)}</h3>
          ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ""}
          <div class="task-date">
            <span>📅</span>
            <span>${formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-delete" onclick="deleteTask('${task._id}')">
          🗑️ Delete
        </button>
      </div>
    </div>
  `,
    )
    .join("");
}

function updateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  totalTasksEl.textContent = total;
  activeTasksEl.textContent = active;
  completedTasksEl.textContent = completed;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
