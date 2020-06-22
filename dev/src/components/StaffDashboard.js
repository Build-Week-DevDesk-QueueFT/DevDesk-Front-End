import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import Staff from "./staff/Staff";

import { useForm } from "react-hook-form";

const StaffDashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const secret = "keepitsecret,keepitsafe!";
  let user;

  return (
    <div>
      {/* <h1>Welcome, {user.username}.</h1> */}
      <Staff />
    </div>
  );
};

export default StaffDashboard;
