import React from "react";

import styled from "styled-components";

const Staff = styled.div`
  border: 2px solid #ef8354;
  background: #2d3142;
  color: #bfc0c0;
  width: 40%;
  margin: 0 auto;
`;

const StaffTicketCard = (props) => {
  return (
    <Staff>
      <div>
        <h3>{props.ticket.title}</h3>
        <p>{props.ticket.description}</p>
        <h4>{props.ticket.category}</h4>
        <p>{props.ticket.tried}</p>
        {!props.ticket.assigned_to ? (
          <button onClick={() => props.assignTicket(props.ticket)}>
            Assign
          </button>
        ) : props.ticket.assigned_to == props.user.id ? (
          <button onClick={() => props.unAssignTicket(props.ticket)}>
            UnAssign
          </button>
        ) : (
          <h2>Assigned!</h2>
        )}
        {!props.ticket.resolved && props.ticket.assigned_to == props.user.id ? (
          <button onClick={() => props.resolveTicket(props.ticket)}>
            Resolve Ticket
          </button>
        ) : null}
        <p> Is Ticket Resolved : {props.ticket.resolved.toString()}</p>
      </div>
    </Staff>
  );
};
export default StaffTicketCard;
