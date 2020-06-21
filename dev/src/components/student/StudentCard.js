import React, { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useForm } from "react-hook-form";

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
    finalizeProject(project.id, refreshProjectList, data, toggleEdit, edit);
  console.log(errors);
  return edit === false ? (
    <div>
      <h2>
        {project.projectName} {project.projectType}
      </h2>
      <button onClick={() => deleteProject(project.id, refreshProjectList)}>
        Delete
      </button>
      <button onClick={() => toggleEdit(!edit)}>Edit</button>
    </div>
  ) : (
    <div>
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

      <button onClick={() => toggleEdit(!edit)}>Cancel</button>
    </div>
  );
};

export default StudentCard;
