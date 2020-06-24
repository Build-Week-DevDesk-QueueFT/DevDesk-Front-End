import React from "react";

const StaffTicketCard = (props) => {
  return (
    <div>
      <h3>{props.ticket.title}</h3>
      <p>{props.ticket.description}</p>
      <h4>{props.ticket.category}</h4>
      <p>{props.ticket.tried}</p>
      {!props.ticket.assigned_to ? (
        <button onClick={() => props.assignTicket(props.ticket)}>Assign</button>
      ) : (
        <h2>Assigned!</h2>
      )}
    </div>
  );
};
export default StaffTicketCard;
