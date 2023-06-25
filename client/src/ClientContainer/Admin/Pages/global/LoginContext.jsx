import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, role, email, phoneNumber) => {
    setUser({ username, role, email, phoneNumber });
    const userStorage = JSON.stringify({ username, role, email, phoneNumber });
    localStorage.setItem('user', userStorage);
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem('user');
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};
