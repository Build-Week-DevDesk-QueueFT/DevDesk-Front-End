import React, { useState, createContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const UserContext = createContext();
export const StaffContext = createContext();

export const AppProvider = (props) => {
  const [user, setUser] = useState([]);
  const [staff, setStaff] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <StaffContext.Provider value={{ staff, setStaff }}>
        {props.children}
      </StaffContext.Provider>
    </UserContext.Provider>
  );
};
