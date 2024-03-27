import * as React from 'react';
import { useFetchTickets } from '../hooks/useFetchTickets';
import { Loading } from './Loading';

export const LatestTickets = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id

  const { result: tickets, loading } = useFetchTickets(id, "", "tickets", "GET");
  console.log(tickets)

  const openTicket = () => {
    console.log("clicked")
  }

  if (loading) {
    return (<Loading />)
  }

  if (!tickets) {
    return <div>Error!</div>;
  }

  return (
    <>
      <table className="table table-success table-hover table-striped max-width-100 tickets_table">
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">Subject</th>
            <th scope="col">Content</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets && tickets.map((ticket, index) => (
            <tr id={index}>

              <td onClick={openTicket} role="button">SENDER</td>
              <td onClick={openTicket} role="button">{ticket.subject}</td>
              <td onClick={openTicket} role="button">{ticket.content}</td>
              <td onClick={openTicket} role="button">DATE HERE</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
