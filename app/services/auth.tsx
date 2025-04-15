import API from './api';

interface User {
  email: string;
  username: string;
  displayName: string;
  token: string;
}

export const login = async (credentials: { email: string; password: string }): Promise<User> => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    // Store token securely (consider using expo-secure-store)
    return response.data;
  }
  throw new Error('Login failed');
};

export const register = async (userData: { email: string; username: string; password: string }): Promise<User> => {
  const response = await API.post('/auth/register', userData);
  if (response.data.token) {
    return response.data;
  }
  throw new Error('Registration failed');
};

export const logout = async (): Promise<void> => {
  // Clear stored token
};