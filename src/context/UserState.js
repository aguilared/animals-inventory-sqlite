import React, { createContext, useState, useEffect } from "react";
const initialState = {
  user: "",
};
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(0);

  useEffect(() => {
     const id = setInterval(() => {
    setUser(window.sessionStorage.getItem("User"));
     }, 500);
     return () => clearInterval(id);
  }, [setUser]);

  

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
