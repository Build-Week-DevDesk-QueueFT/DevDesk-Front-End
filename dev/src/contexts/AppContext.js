import React, { useState, createContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const StudentContext = createContext();
export const StaffContext = createContext();

export const AppProvider = (props) => {
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  return (
    <StudentContext.Provider value={[students, setStudents]}>
      <StaffContext.Provider value={[staff, setStaff]}>
        {props.children}
      </StaffContext.Provider>
    </StudentContext.Provider>
  );
};
