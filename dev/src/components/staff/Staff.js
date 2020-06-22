import React, { useEffect, useState, useContext } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import TicketCard from "./TicketCard";
import { UserContext } from "../../contexts/AppContext";

const Staff = () => {
  const [tickets, setTickets] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    axiosWithAuth()
      .get("/api/tickets")
      .then((res) => {
        console.log(res.data);
        setTickets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosWithAuth()
      .get(`/api/users/${user.id}/tickets`)
      .then((res) => {
        console.log(res.data);
        setUserTickets(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      {tickets.map((ticket) => {
        return <TicketCard key={ticket.id} {...ticket} />;
      })}
      <h2>Assigned Tickets</h2>
      {userTickets.map((ticket) => {
        return <TicketCard key={ticket.id} {...ticket} />;
      })}
    </div>
  );
};

export default Staff;
