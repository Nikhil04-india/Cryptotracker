// Api.js

// Function to log in a user
export async function login(email, password) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      // Store this token and include it in the headers of subsequent requests
      localStorage.setItem('token', token);
      return { success: true, token }; // Returning token for further use if needed
    } else {
      // Handle login failure
      const errorData = await response.json();
      console.error('Login failed', errorData);
      return { success: false, message: errorData.error || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login error' };
  }
}

// Function to create a new account
export const createAccount = async (fullName, email, password) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create account');
    }

    const data = await response.json();
    return { success: true, data }; // Returning data if necessary, depending on your backend response structure
  } catch (error) {
    console.error('Error creating account:', error);
    return { success: false, message: error.message || 'Failed to create account' };
  }
};
