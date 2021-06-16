import React, { createContext, useEffect, useState } from 'react';

import firebaseAppAuth from "../firebaseConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }} >
      {children}
    </UserContext.Provider>
  )
}