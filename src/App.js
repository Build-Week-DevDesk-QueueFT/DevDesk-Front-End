import React, { useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Header from "./components/Header";

import PrivateRouteOne from "./utils/PrivateRouteOne";
import { UserContext } from "./contexts/AppContext";
import "./App.css";
import StudentDashBoard from "./components/StudentDashBoard";
import StaffDashboard from "./components/StaffDashboard";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import styled from "styled-components";

const Title = styled.div`
  font-size: 3rem;
  margin: 5% 0;
`;

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (userId) {
      axiosWithAuth()
        .get(`/api/users/${Number(userId)}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="App">
      <Header />
      <Title style={{ color: "#2d3142" }}>Devdesk</Title>
      <Route exact path="/" component={Login} />
      <Route path="/Register" component={Register} />
      <PrivateRouteOne path="/StaffDashboard" component={StaffDashboard} />
      <PrivateRouteOne path="/StudentDashBoard" component={StudentDashBoard} />
    </div>
  );
}

export default App;
