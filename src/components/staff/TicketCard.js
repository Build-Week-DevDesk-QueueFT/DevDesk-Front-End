import React from "react";
import styled from "styled-components";

const StudentTicket = styled.div`
  border: 2px solid #ef8354;
  background: #2d3142;
  color: #bfc0c0;
  width: 40%;
  margin: 0 auto;
`;

const TicketsCard = (props) => {
  return (
    <StudentTicket>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <h4>{props.category}</h4>
        <p>{props.tried}</p>
      </div>
    </StudentTicket>
  );
};
export default TicketsCard;
