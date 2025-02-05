import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Send user info as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    const { token } = data; // Assuming the token is returned in the response
    localStorage.setItem('token', token); // Store token in localStorage for future requests

    return token; // Return token or other useful data if needed
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Re-throw error or handle it as needed
  }
};

export { login };