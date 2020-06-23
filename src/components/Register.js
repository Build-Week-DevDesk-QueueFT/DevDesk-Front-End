import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    <div className="background">
      <h1 style={{ color: "white" }}>Register</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
        <input
          className="forms"
          type="email"
          placeholder="Email"
          name="email"
          ref={register({ max: 25, min: 5 })}
        />
        <select name="Make Selection" ref={register({ required: true })}>
          <option value={false}>Student</option>
          <option value={true}>Staff</option>
        </select>

        <input className="forms" type="submit" />
      </form>
    </div>
  );
}
