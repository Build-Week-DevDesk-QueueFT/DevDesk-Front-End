import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { useForm } from "react-hook-form";
import Student from "./student/Student";

const StudentDashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const secret = "keepitsecret,keepitsafe!";
  let user;

  return (
    <div>
      {/* <h1>Welcome, {user.username}.</h1> */}
      <Student />
    </div>
  );
};

export default StudentDashboard;
