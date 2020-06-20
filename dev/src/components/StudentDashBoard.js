import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { useForm } from "react-hook-form";
import Student from "./student/Student";

import jwt from "jsonwebtoken";

const StudentDashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const secret = "keepitsecret,keepitsafe!";
  let user;
  jwt.verify(token, secret, (error, decodedToken) => {
    user = decodedToken;
  });

  return (
    <div>
      <h1>Welcome, {user.username}.</h1>
    </div>
  );
};

export default StudentDashboard;
