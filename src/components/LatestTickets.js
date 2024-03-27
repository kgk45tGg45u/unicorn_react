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

  const { result: tickets, loading } = useFetchTickets(id, "", "tickets", "GET");
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
    <>
      <table className="table table-success table-striped">

        <thead>
          <tr>
            <th scope="col">Select</th>
            <th scope="col">From</th>
            <th scope="col">Subject</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets && tickets.map((ticket, index) => (
            <tr id={index}>
              <th scope="row">1</th>
              <td>SENDER</td>
              <td>{ticket.subject}</td>
              <td>{ticket.content}</td>
              <td>DATE HERE</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>


    );
}
