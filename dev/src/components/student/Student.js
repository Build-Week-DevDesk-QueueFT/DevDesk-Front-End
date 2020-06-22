import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import StudentCard from "../student/StudentCard";
import { UserContext } from "../../contexts/AppContext";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import jwt from "jsonwebtoken";

const postNewStudent = (newStudent, refreshStudent) => {
  axiosWithAuth()
    .post("/api/tickets", newStudent)
    .then((res) => {
      console.log(res.data);
      refreshStudent();
    })
    .catch((err) => {
      console.log(err, "Failed to post new student");
    });
};

const Student = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const secret = "keepitsecret,keepitsafe!";
  let user;
  jwt.verify(token, secret, (error, decodedToken) => {
    user = decodedToken;
  });
  const [setUser] = useContext(UserContext);

  const refreshStudent = (props) => {
    axiosWithAuth()
      .get("/api/tickets")
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshStudent();
  }, []);

  const submitStudent = (data) => {
    console.log(data);
    postNewStudent(
      {
        title: props.title,
        description: props.description,
        tried: props.tried,
        category: props.category,
      },
      refreshStudent
    );
  };

  const { register, handleSubmit, errors } = useForm();
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Title"
        name="Title"
        ref={register({ required: true, min: 2, maxLength: 80 })}
      />
      <textarea
        name="Description"
        placeholder="Description"
        ref={register({ required: true, max: 2, maxLength: 300 })}
      />
      <input
        type="text"
        placeholder="Tried"
        name="Tried"
        ref={register({
          required: true,
          min: 2,
          maxLength: 128,
        })}
      />
      <input
        type="text"
        placeholder="Category"
        name="Category"
        ref={register({ required: true, min: 2, maxLength: 128 })}
      />

      <input type="submit" />
    </form>
    <div>
     <div className="studentList">
       {student.map((student, index) => (
            <StudentCard student={student} refreshStudent={refreshStudent} />
        ))}
    </div>
    </div>
  
       
}

export default Student;
