import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, role,email,phoneNumber) => {
    setUser({ username, role,email,phoneNumber});
    const userCookie = JSON.stringify({ username, role,email,phoneNumber });
    Cookies.set('user', userCookie);
  };

  const logout = () => {
    setUser({});
    Cookies.remove('user');
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};
