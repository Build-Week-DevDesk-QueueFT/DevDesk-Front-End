import React, { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useForm } from "react-hook-form";

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
            if (ticket.id === id) return updatedTicket;
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
    <div>
      <h2>
        {ticket.title} {ticket.description} {ticket.tried} {ticket.category}
      </h2>
      <button onClick={() => deleteTicket(ticket.id)}>Delete</button>
      <button onClick={() => toggleEdit(!edit)}>Edit</button>
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

      <button onClick={() => toggleEdit(!edit)}>Cancel</button>
    </div>
  );
};

export default StudentTicketCard;
