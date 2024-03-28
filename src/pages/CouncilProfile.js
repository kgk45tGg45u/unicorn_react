import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { toast } from 'react-toastify';

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

import profilePlaceholder from '../assets/profile-image-placeholder.jpeg'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import { DashboardCard } from '../components/DashboardCard'
import menu from '../assets/SVG/bars-solid.svg'

export const CouncilProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id
  const navigate = useNavigate()
  const { result: currentUnit, loading, error } = useFetch(id, "", "units", "GET");
  const { result: currentUnion, loading: loadingUnion, error: errorUnion } = useFetch(id, "", "unions", "GET");
  const name = user ? user.name : "";
  const [open, setOpen] = useState(false);


  if(error || errorUnion) {
    return (
      <div>
        An error occured. Please login.
      </div>
    )}

  if(loading || loadingUnion) {
    return (<Loading />)}

  if(currentUnit && currentUnion) {

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
    console.log(currentUnit)
    // toast("Current Unit: loaded.")
    toast("Current Union loaded.")
    return (
      <section>
        <div className="ticketing_icons">
          <img src={menu} onClick={toggleDrawer(true)} className="ticketing_menu pointer" alt='Open menu' />

          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>

        <div className="container">
          <div className="row my-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="col my-4 infostand">
              <div className="infostand_data">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td><h4><strong>{currentUnion.union.title}</strong></h4></td>
                  </tr>
                  <tr>
                    <td>Responsible:</td>
                    <td>{name}</td>
                    <td>Profile</td>
                  </tr>
                  <tr>
                    <td>Union:</td>
                    <td><strong>{currentUnion.union.title}</strong></td>
                    <td>Union profile</td>
                  </tr>
                </tbody>
              </table>

              </div>
            </div>
            <div className="col-auto my-4">
              <img src={profilePlaceholder} alt="Profile" className="profile_img" />
              {/* <div className="sidebar">bla bal jsdglsjdblgsj nslf jnslfkn lsfk sfln f </div> */}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="p-2 mx-2 divbg rounded-3 shadow-lg">
            <div className="d-flex flex-wrap justify-content-around p-2">
              <DashboardCard icon={moneyBill} text="Wallet" link="/wallet" />
              <DashboardCard icon={unit} text="Working Unit" link="/unit" />
              <DashboardCard icon={council} text="Council" link="/council" />
              <DashboardCard icon={union} text="Union" link="/union" />
              <DashboardCard icon={savings} text="Saving / Debt" link="/savings" />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
