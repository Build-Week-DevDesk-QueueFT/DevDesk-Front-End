import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/AppContext";
import styled from 'styled-components';

const LoginBox = styled.div `
margin: 30px 40px 0px 380px;
justify-content: center;
background: blue;
color: #f5f5f5;

width: 40%;
height: 90vh;
border: 1px solid black;
border-radius:  3px;
`
const StyleForm = styled.div`
background: #8DB48E;
margin: 0 auto;
border-radius: 10%;
padding: 20px;
width: 50%;
`


const postLogin = (credentials, match, setUser) => {
  axios
    .post("/api/auth/login", credentials)
    .then((res) => {

      localStorage.setItem("token", JSON.stringify(res.data.token)); //This should only be an axios request
      localStorage.setItem("id", res.data.id);

      setUser(res.data);
      if (res.data.is_helper) {
        match.push("/StaffDashboard");
      } else {
        match.push("/StudentDashboard");
      }
    })
    .catch((err) => {
      console.log(err, "Failed to login");
    });
};

const Login = () => {
  const match = useHistory();
  const { setUser } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => postLogin(data, match, setUser);
  console.log(errors);

  return (
    <LoginBox>
    <div className="background">
      <h1 style={{ color: "white" }}>Login</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <StyleForm>
        <input
          className="forms"
          type="text"
          placeholder="User Name"
          name="username"
          ref={register({ required: true, max: 15, min: 2, maxLength: 100 })}
        />
        <input
          className="forms"
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, max: 20, min: 2 })}
        />

        <input className="forms" type="submit" />
       </StyleForm> 
      </form>
      
    </div>
    </LoginBox>
  );
};

export default Login;
