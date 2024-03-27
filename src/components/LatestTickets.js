import * as React from 'react';
import { useState } from 'react'
import { useFetchTickets } from '../hooks/useFetchTickets';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
import { Loading } from './Loading';

export const LatestTickets = () => {
  const [currentTickets, setCurrentTickets] = useState({
    subject: null,
    content: null
  });
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id

  const { result: tickets, loading } = useFetchTickets(1, "", "tickets", "GET");
console.log(tickets)
// const allTickets = tickets.map((ticket) => (
//   setCurrentTickets(ticket)
// ))
// console.log(allTickets)
      // setCurrentTickets(tickets)

      // console.log("Tickets in UseEffect:", currentTickets)



  if (loading) {
    return (<Loading />)
  }

  if (!tickets) {
    return <div>Error!</div>;
  }

  return (
    tickets.map((ticket, index) => (
    <div id={index}>{ticket.subject}</div>
    )));
}
