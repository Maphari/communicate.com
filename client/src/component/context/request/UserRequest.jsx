import React, { createContext, useState } from "react";

export const UserRequestContext = createContext();
export const UserRequestProvider = ({ children }) => {
  const [request, setRequest] = useState([]);

  return (
    <UserRequestContext.Provider value={{ request, setRequest }}>
      {children}
    </UserRequestContext.Provider>
  );
};
