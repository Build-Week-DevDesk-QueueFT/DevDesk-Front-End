import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
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
        setTickets(res.data);
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

export default Student;
