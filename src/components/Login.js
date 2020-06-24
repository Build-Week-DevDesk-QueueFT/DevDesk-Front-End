import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/AppContext";
import styled from "styled-components";

const LoginBox = styled.div`
  margin: 30px 40px 0px 380px;
  justify-content: center;
  background: #2d3142;
  color: black;
  width: 40%;
  height: 50vh;
  border: 4px solid #ef8354;
  border-radius: 25%;
  color: white;
`;
const InputField = styled.div`
  flex-direction: column;
  justify-content: space-betwen;
  padding: 10px;
  margin: 10% auto 10% auto;
  width: 40%;
`;
const Button = styled.button`
  background: #ef8354;
  height: 30px;
  width: 150px;
  radius: 20%;
`;

const postLogin = (credentials, match, setUser) => {
  axios
    .post("https://desk-queue.herokuapp.com/api/auth/login", credentials)
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.data.token)); //This should only be an axios request
      localStorage.setItem("id", res.data.id);
      console.log(credentials);
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
    <div className="background">
      <LoginBox>
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <InputField>
            <input
              className="forms"
              type="text"
              placeholder="User Name"
              name="username"
              ref={register({
                required: true,
                max: 15,
                min: 2,
                maxLength: 100,
              })}
            />
            <input
              className="forms"
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true, max: 20, min: 2 })}
            />

            <Button type="submit">Login</Button>
            <p></p>
          </InputField>
        </form>
      </LoginBox>
    </div>
  );
};

export default Login;
