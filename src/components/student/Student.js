import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components"
import StudentTicketCard from "../student/StudentTicketCard";
import { UserContext } from "../../contexts/AppContext";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import TicketsCard from "../staff/TicketCard";

const Student = (props) => {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);

  const postNewTicket = (newTicket) => {
    axiosWithAuth()
      .post("/api/tickets", newTicket)
      .then((res) => {
        console.log(res.data);
        setAllTickets(res.data);
        setTickets([...tickets, newTicket]);
      })
      .catch((err) => {
        console.log(err, "Failed to post new ticket");
      });
  };
  const refreshTicket = (props) => {
    const userId = localStorage.getItem("id");
    axiosWithAuth()
      .get(`/api/users/${Number(userId)}/tickets`)
      .then((res) => {
        console.log(res);
        setTickets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const refreshAllTicket = (props) => {
=======
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
        setAllTickets(res.data);



  useEffect(() => {

    refreshTicket();
    refreshAllTicket();
  }, []);

  const submitTicket = (data) => {
    console.log(data);
    postNewTicket(data);

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


    <>
      <form onSubmit={handleSubmit(submitTicket)}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          ref={register({ required: true, min: 2, maxLength: 80 })}
        />
        <textarea
          name="description"
          placeholder="Description"
          ref={register({ required: true, max: 2, maxLength: 300 })}
        />
        <input
          type="text"
          placeholder="Tried"
          name="tried"
          ref={register({
            required: true,
            min: 2,
            maxLength: 128,
          })}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          ref={register({ required: true, min: 2, maxLength: 128 })}
        />

        <input type="submit" />
      </form>

      <div>
        <div className="studentList">
          {allTickets.map((ticket) => {
            return <TicketsCard {...ticket} />;
          })}
          <h3>My Tickets</h3>
          {tickets.map((ticket, index) => (
            <StudentTicketCard
              ticket={ticket}
              setTickets={setTickets}
              tickets={tickets}
            />
          ))}
        </div>
      </div>
    </>
  );
};

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