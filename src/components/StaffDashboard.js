import React, { useState, useEffect, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import Staff from "./staff/Staff";
import { UserContext } from "../contexts/AppContext";

import { useForm } from "react-hook-form";

const StaffDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <Staff />
    </div>
  );
};

export default StaffDashboard;
