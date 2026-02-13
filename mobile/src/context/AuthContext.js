import React, { createContext, useContext, useMemo, useState } from 'react';
import client, { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const res = await client.post('/auth/login', { email, password });
    setUser(res.data.user);
    setToken(res.data.accessToken);
    setAuthToken(res.data.accessToken);
  };

  const signup = async (email, password) => {
    const res = await client.post('/auth/signup', { email, password });
    setUser(res.data.user);
    setToken(res.data.accessToken);
    setAuthToken(res.data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
  };

  const value = useMemo(() => ({ user, token, login, signup, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
