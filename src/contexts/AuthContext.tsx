import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<User>;
  completeLogin: (user: User, rememberMe?: boolean) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'khrms-auth-user';

const persistUser = (userToStore: User, rememberMe = true) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);

  const storage = rememberMe ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userToStore));
};

const updateStoredUser = (nextUser: User) => {
  if (typeof window === 'undefined') {
    return;
  }

  const hasLocalStorage = window.localStorage.getItem(AUTH_STORAGE_KEY);
  const hasSessionStorage = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
  const storage = hasLocalStorage ? window.localStorage : hasSessionStorage ? window.sessionStorage : window.localStorage;

  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
};

const readStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY) || window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  const login = async (username: string, password: string) => {
    const res = await apiService.login(username, password);
    return res.user;
  };

  const completeLogin = (signedInUser: User, rememberMe = true) => {
    setUser(signedInUser);
    persistUser(signedInUser, rememberMe);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      const nextUser = { ...user, role: newRole };
      setUser(nextUser);
      updateStoredUser(nextUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'super_admin',
        isAuthenticated: !!user,
        login,
        completeLogin,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
