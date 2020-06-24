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
        ) : (
          <h2>Assigned!</h2>
        )}
      </div>
    </Staff>
  );
};
export default StaffTicketCard;
