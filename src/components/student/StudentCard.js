import React, { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StudentBox = styled.div`
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
const StudentInput = styled.div`
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

const deleteStudent = (id, refreshStudent) => {
  axiosWithAuth()
    .delete(`/api/tickets/${userId}`)
    .then((res) => {
      console.log("Student Deleted");
      refreshStudent();
    })
    .catch((err) => {
      console.log(err, "Failed to delete Student");
    });
};
const finalizeProject = (id, refreshStudent, student, toggleEdit, edit) => {
  axiosWithAuth()
    .put(`/api/tickets/${userid}`, student)
    .then((res) => {
      console.log("Student Editted");
      toggleEdit(!edit);
      refreshStudent();
    })
    .catch((err) => {
      console.log(err, "Failed to edit Student");
    });
};

const ProjectCard = ({ student, refreshStudent }) => {
  const [edit, toggleEdit] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) =>
    finalizeProject(user.id, refreshStudent, data, toggleEdit, edit);
  console.log(errors);
  return edit === false ? (
    <div>
      <h2>
        {user.title} {user.description} {user.tried} {user.category}
      </h2>
      <button onClick={() => deleteStudent(user.id, refreshStudent)}>
        Delete
      </button>
      <button onClick={() => toggleEdit(!edit)}>Edit</button>
    </div>
  ) : (
    <div>
      <StudentBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StudentInput>
            <input
              className=" forms"
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
              className=" forms"
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
              className=" forms"
              type="text"
              placeholder="Category"
              name="Category"
              ref={register({ required: true, min: 2, maxLength: 128 })}
            />

            <Button className="forms" type="submit">
              Submit
            </Button>
          </StudentInput>
        </form>
      </StudentBox>

      <button onClick={() => toggleEdit(!edit)}>Cancel</button>
    </div>
  );
};

export default StudentCard;
