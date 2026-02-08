// API Base URL - Update this to match your backend URL
const API_BASE_URL = "https://todo-app1-3fd5.onrender.com";
// const API_BASE_URL = "http://localhost:5001";

/**
 * Store token in localStorage
 * @param {string} token - JWT token
 */
function setToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Get token from localStorage
 * @returns {string|null} JWT token or null
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Remove token from localStorage
 */
function removeToken() {
  localStorage.removeItem('token');
}

/**
 * Register a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data
 */
async function signup(name, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    // Store token in localStorage
    setToken(data.token);

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Login an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data
 */
async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token in localStorage
    setToken(data.token);

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
async function logout() {
  try {
    const token = getToken();

    if (token) {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Remove token from localStorage
    removeToken();

    // Redirect to login page
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout error:', error);
    // Even if logout fails on server, clear token and redirect
    removeToken();
    window.location.href = 'login.html';
  }
}

/**
 * Check if user is authenticated
 * @returns {Promise<Object|null>} User data if authenticated, null otherwise
 */
async function checkAuth() {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      removeToken(); // Clear invalid token
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    removeToken(); // Clear invalid token
    return null;
  }
}

/**
 * Redirect to login if not authenticated (for protected pages)
 */
async function requireAuth() {
  const user = await checkAuth();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

/**
 * Redirect to main app if already authenticated (for auth pages)
 */
async function checkAuthAndRedirect() {
  const user = await checkAuth();
  if (user) {
    window.location.href = 'index.html';
  }
}
