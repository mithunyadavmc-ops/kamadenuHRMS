import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'usr-101',
    name: 'Anil Yadav',
    email: 'anil.yadav@kamadenu.com',
    role: 'super_admin',
    department: 'Executive Leadership',
    title: 'Managing Director & Head of Talent',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    createdAt: '2024-01-15'
  });

  const login = async (email: string, role: UserRole) => {
    try {
      const res = await apiService.login(email, role);
      setUser(res.user);
    } catch (err) {
      // Fallback
      setUser({
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email,
        role,
        department: 'Human Resources',
        title: `${role.toUpperCase().replace('_', ' ')} Specialist`,
        createdAt: new Date().toISOString().substring(0, 10)
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'super_admin',
        isAuthenticated: !!user,
        login,
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
