import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get the decoded token
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token); // Decode the JWT token
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null; // Return null if no token exists
  }

  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp ? decoded.exp < currentTime : true; // Check if token expiration is valid
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true; // If decoding fails, consider the token expired
    }
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // Return the token from localStorage
  }

  // Login and set the token to localStorage
  login(idToken: string): void {
    localStorage.setItem('token', idToken); // Store the token in localStorage
    window.location.href = '/'; // Redirect to the home page
  }

  // Logout and remove the token from localStorage
  logout(): void {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
