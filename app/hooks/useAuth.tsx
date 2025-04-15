import { useState, createContext, useContext } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/auth';

interface AuthContextType {
  user: any;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  const login = async (credentials: { email: string; password: string }) => {
    const userData = await apiLogin(credentials);
    setUser(userData);
  };

  const register = async (userData: { email: string; username: string; password: string }) => {
    const newUser = await apiRegister(userData);
    setUser(newUser);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value = { user, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}