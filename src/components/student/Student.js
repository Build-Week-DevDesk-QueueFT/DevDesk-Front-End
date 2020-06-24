import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import StudentTicketCard from "../student/StudentTicketCard";
import { UserContext } from "../../contexts/AppContext";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import TicketsCard from "../staff/TicketCard";
import styled from "styled-components";

const StudentTicketForm = styled.div`
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
    axiosWithAuth()
      .get("/api/tickets")
      .then((res) => {
        console.log(res);
        setAllTickets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshTicket();
    refreshAllTicket();
  }, []);

  const submitTicket = (data) => {
    console.log(data);
    postNewTicket(data);
  };

  const { register, handleSubmit, errors } = useForm();
  console.log(errors);

  return (
    <>
      <StudentTicketForm>
        <form onSubmit={handleSubmit(submitTicket)}>
          <StudentInput>
            <input
              className="forms"
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
              className="forms"
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
              className="forms"
              type="text"
              placeholder="Category"
              name="category"
              ref={register({ required: true, min: 2, maxLength: 128 })}
            />

            <Button className="forms" type="submit">
              Submit
            </Button>
          </StudentInput>
        </form>
      </StudentTicketForm>

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

export default Student;
