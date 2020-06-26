import React, { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StudentTicketBox = styled.div`
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
const StudentInputField = styled.div`
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

const S = styled.div`
  border: 2px solid #ef8354;
  background: #2d3142;
  color: #bfc0c0;
  width: 40%;
  margin: 0 auto;
`;

const StudentTicketCard = ({ ticket, setTickets, tickets }) => {
  const [edit, toggleEdit] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => editTicket(ticket.id, data);
  console.log(errors);

  const editTicket = (id, updatedTicket) => {
    axiosWithAuth()
      .put(`/api/tickets/${id}`, updatedTicket)
      .then((res) => {
        console.log(res.data);
        setTickets(
          tickets.map((ticket) => {
            if (ticket.id === id) return res.data[0];
            return ticket;
          })
        );
        toggleEdit(!edit);
      })
      .catch((err) => {
        console.log(err, "Failed to edit Ticket");
      });
  };

  const deleteTicket = (id) => {
    axiosWithAuth()
      .delete(`/api/tickets/${id}`)
      .then((res) => {
        console.log(res);
        setTickets(tickets.filter((ticket) => ticket.id !== id));
      })
      .catch((err) => {
        console.log(err, "Failed to delete ticket");
      });
  };

  return edit === false ? (
    <S>
      <div>
        <h2>
          {ticket.title} {ticket.description} {ticket.tried} {ticket.category}
        </h2>
        <button onClick={() => deleteTicket(ticket.id)}>Delete</button>
        <button onClick={() => toggleEdit(!edit)}>Edit</button>
      </div>
    </S>
  ) : (
    <div>
      <StudentTicketBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StudentInputField>
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

            <input className="forms" type="submit" />
          </StudentInputField>
        </form>

        <button onClick={() => toggleEdit(!edit)}>Cancel</button>
      </StudentTicketBox>
    </div>
  );
};

export default StudentTicketCard;
