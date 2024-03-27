import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { LatestTickets } from '../../components/LatestTickets';
import '../../assets/ticketing.css'
import menu from '../../assets/SVG/bars-solid.svg'
import newTicket from '../../assets/SVG/square-plus-solid.svg'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const TicketingApp = () => {
  const [openNewTicket, setOpenNewTicket] = useState(false);
  const handleOpen = () => setOpenNewTicket(true);
  const handleClose = () => setOpenNewTicket(false);
  const [open, setOpen] = useState(false);

  const newTicketstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All tickets', 'Answered', 'Create New'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <section>
      <div className="ticketing_icons">
        <img onClick={toggleDrawer(true)} className="ticketing_menu pointer" src={menu} alt='Open menu' />
        <img onClick={handleOpen} className="ticketing_menu pointer" src={newTicket} alt='Open a new ticket' />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      <div className="ticketing-header">
        <LatestTickets />
      </div>

    {/* New ticket modal */}
      <div>
        <Modal
          open={openNewTicket}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={newTicketstyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </section>
  )
}
