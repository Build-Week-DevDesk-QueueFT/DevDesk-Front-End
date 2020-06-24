import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { useForm } from "react-hook-form";
import Student from "./student/Student";
import { UserContext } from "../contexts/AppContext";

const StudentDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {user.username}.</h1>
      <Student />
    </div>
  );
};

export default StudentDashboard;
