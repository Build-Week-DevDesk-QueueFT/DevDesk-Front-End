import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Header from "./components/Header";

import { AppProvider } from "./contexts/AppContext";
import PrivateRouteOne from "./utils/PrivateRouteOne";
import PrivateRoutetwo from "./utils/PrivateRouteTwo";

import "./App.css";
import StudentDashboard from "./components/StudentDashBoard";
import StaffDashboard from "./components/StaffDashBoard";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Route exact path="/" component={Login} />
        <Route path="/Register" component={Register} />
        <PrivateRouteOne path="/StaffDashboard" component={StaffDashboard} />
        <PrivateRouteTwo
          path="/StudentDashboard"
          component={StudentDashboard}
        />
      </div>
    </AppProvider>
  );
}

export default App;
