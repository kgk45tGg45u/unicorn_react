import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import Cropper from '../components/ImageCropper'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import { DashboardCard } from '../components/DashboardCard'
import menu from '../assets/SVG/bars-solid.svg'
import { LatestRequestsCard } from '../components/LatestRequestsCard';
import { XputCard } from '../components/XputCard';

const unitClient = new ApolloClient({
  uri: 'http://localhost:3001/unit/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});
const unionClient = new ApolloClient({
  uri: 'http://localhost:3001/union/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});
const councilClient = new ApolloClient({
  uri: 'http://localhost:3001/council/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});

// const GET_UNION = gql`
//   query GetUnion($members: ID!) {
//     GetUnion(members: $members) {
//       name
//       id
//     }
//   }
// `;

const GET_UNIT = gql`
  query GetUnitByUserId($users: ID!) {
    GetUnitByUserId(users: $users) {
      name
      id
    }
  }
`;

const GET_COUNCIL = gql`
  query GetCouncil($members: [ID]) {
    GetCouncil(members: $members) {
      name
      responsible_id
    }
  }
`;

export const CouncilProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  // const { loading: unionLoading, error: unionError, data: unionData } = useQuery(GET_UNION, {
  //   variables: { members: user.id },
  //   client: unionClient, // Use the unitClient
  //   errorPolicy: "all",
  // });

  const { loading: councilLoading, error: councilError, data: councilData } = useQuery(GET_COUNCIL, {
    variables: { members: user.id },
    client: councilClient, // Use the unitClient
    errorPolicy: "all",
  });

  const { loading: unitLoading, error: unitError, data: unitData } = useQuery(GET_UNIT, {
    variables: { users: user.id },
    client: unitClient, // Use the unitClient
    errorPolicy: "all",
  });

  const [open, setOpen] = useState(false);


  if(unitError || councilError) {
    return (
      <div>
        An error occured. Please login.
      </div>
    )}

  if(councilLoading) {
    return (<Loading />)}

  if(unitData && councilData) {

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          <LatestRequestsCard title="Latest Requests" button1="New" button2="Tickets" />
        </List>
        <Divider />
        <List>
          <LatestRequestsCard title="Union Requests" button1="New" button2="Tickets" />
        </List>
        <Divider />
        <List>
          <LatestRequestsCard title="Members" button1="New" button2="Remove" />
        </List>
      </Box>
    );

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
                      <td><h4><strong>{councilData.GetCouncil[0].name}</strong></h4></td>
                    </tr>
                    <tr>
                      <td>Responsible:</td>
                      <td>{councilData.GetCouncil[0].responsible_id}</td>
                      <td>Profile</td>
                    </tr>
                    <tr>
                      <td>Working Unit:</td>
                      <td><strong>{unitData.GetUnitByUserId[0].name}</strong></td>
                      <td>Unit profile</td>
                    </tr>
                    {/* <tr>
                      <td>Union:</td>
                      <td><strong>{unionData.GetUnion ? unionData.GetUnion[0].name : <p>Register union</p>}</strong></td>
                      <td>Union profile</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-auto my-4">
              <Cropper />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row p-2 mb-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="col-md-6 col-sm-12">
              <XputCard title="Input / Last Month" />
            </div>
            <div className="col-md-6 col-sm-12">
              <XputCard title="Output / Last Month" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="p-2 mx-2 mb-4 divbg rounded-3 shadow-lg">
            News Stand
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
