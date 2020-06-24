import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const RegisterBox = styled.div`
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
const RegisterInputField = styled.div`
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
  margin-top: 4% 0;
`;
const postRegister = (credentials) => {
  axiosWithAuth()
    .post("/api/auth/register", credentials)
    .then((res) => {
      console.log(res.data, "Registry success");
    })
    .catch((err) => {
      console.log(err, "failed to fetch");
    });
};

export default function Register() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => postRegister(data);
  console.log(errors);

  return (
    <RegisterBox>
      <div className="background">
        <h1 style={{ color: "white" }}>Register</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <RegisterInputField>
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
            <br />
            <input
              className="forms"
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true, max: 20, min: 2 })}
            />
            <br />
            <input
              className="forms"
              type="email"
              placeholder="Email"
              name="email"
              re
              ref={register({ max: 25, min: 5 })}
            />
            <br />
            <select name="Make Selection" ref={register({ required: true })}>
              <option value={false}>Student</option>
              <option value={true}>Staff</option>
            </select>

            <Button className="forms" type="submit">
              Sign up!
            </Button>
          </RegisterInputField>
        </form>
      </div>
    </RegisterBox>
  );
}
