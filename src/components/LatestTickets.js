import * as React from 'react';
import { useState, useEffect } from 'react'
import { useFetchTickets } from '../hooks/useFetchTickets';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Loading } from './Loading';

export const LatestTickets = () => {
  const [tickets, setTickets] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id

  const { result, loading, error } = useFetchTickets(id, "", "tickets", "GET");

  useEffect(() => {
    if (result) {
      const allData = result.rows.map((ticket) => ({
        subject: ticket.subject,
        content: ticket.content
      }));
      setTickets(allData);
    }
  }, [result]);


  if (loading) {
    return (<Loading />)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!result) {
    return <div>Error!</div>;
  }

  return (
    <List sx={{ width: '100%', maxWidth: '1024', bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={tickets[0].subject}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {currentUser.name}
              </Typography>
              {tickets[0].content}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo incidunt sequi explicabo esse nostrum iure quaerat obcaecati officiis amet nihil, magnam maiores expedita provident vero quod debitis ea recusandae suscipit?'}
            </React.Fragment>
          }
          />
      </ListItem>
    </List>
  );
}
