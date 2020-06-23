import React from "react";

const TicketsCard = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <h4>{props.category}</h4>
      <p>{props.tried}</p>
    </div>
  );
};
export default TicketsCard;
