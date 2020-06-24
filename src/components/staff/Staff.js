import React, { useEffect, useState, useContext } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import StaffTicketCard from "./StaffTicketCard";
import { UserContext } from "../../contexts/AppContext";
import styled from "styled-components";

const H2 = styled.h2`
  font-size: 2rem;
  color: #4f5d75;
`;

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
  const assignTicket = (ticket) => {
    axiosWithAuth()
      .put(`/api/tickets/${ticket.id}`, { ...ticket, assigned_to: user.id })
      .then((res) => {
        console.log(res.data);
        setUserTickets([...userTickets, res.data[0]]);
        setTickets(
          tickets.map((t) => {
            if (ticket.id === t.id) return res.data[0];
            return t;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const unAssignTicket = (ticket) => {
    axiosWithAuth()
      .put(`/api/tickets/${ticket.id}`, { ...ticket, assigned_to: 0 })
      .then((res) => {
        console.log(res.data);
        setUserTickets(userTickets.filter((t) => t.id !== ticket.id));
        setTickets(
          tickets.map((t) => {
            if (ticket.id === t.id) return res.data[0];
            return t;
          })
        );
      })
      .catch((err) => console.log(err));
  };
  const resolveTicket = (ticket) => {
    axiosWithAuth()
      .put(`/api/tickets/${ticket.id}`, {
        ...ticket,
        resolved: !ticket.resolved,
      })
      .then((res) => {
        console.log(res.data);
        setUserTickets(
          tickets.map((t) => {
            if (ticket.id === t.id) return res.data[0];
            return t;
          })
        );

        setTickets(
          tickets.map((t) => {
            if (ticket.id === t.id) return res.data[0];
            return t;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {tickets.map((ticket) => {
        return (
          <StaffTicketCard
            resolveTicket={resolveTicket}
            user={user}
            key={ticket.id}
            ticket={ticket}
            assignTicket={assignTicket}
            unAssignTicket={unAssignTicket}
          />
        );
      })}
      <H2>Assigned Tickets</H2>
      {userTickets.map((ticket) => {
        return (
          <StaffTicketCard
            user={user}
            key={ticket.id}
            ticket={ticket}
            unAssignTicket={unAssignTicket}
            resolveTicket={resolveTicket}
          />
        );
      })}
    </div>
  );
};

export default Staff;
