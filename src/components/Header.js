import React from "react";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <h2 class="logo">DevDesk-Queue</h2>
        </div>
        <div style={{ width: "70%", display: "flex" }}>
          <nav>
            <a>Home</a>
            <a>Team</a>

            <Link to={"StudentDashboard"}>Student Dashboard</Link>
            <Link to={"StaffDashboard"}>Staff Dashboard</Link>
            <Link to={"/Register"}>SignUp</Link>
            <Link to={"/"}>Login</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
