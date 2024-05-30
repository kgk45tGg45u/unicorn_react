import { useAuth } from '../hooks/AuthProvider'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Loading } from '../components/Loading'
import ReusablePopover from '../components/ReusablePopover';
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import { DashboardCard } from '../components/DashboardCard'
import { Announcement } from '../components/Announcement'
import Cropper from '../components/ImageCropper'
// import unicornSymbol from '../assets/unicorn-symbol-2.png';

import { gql, useQuery } from '@apollo/client';
// Apollo Client for Unit Schema
const unitClient = new ApolloClient({
  uri: 'http://localhost:3001/unit/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});
const councilClient = new ApolloClient({
  uri: 'http://localhost:3001/council/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});

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
      id
    }
  }
`;

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const { loading, error, data } = useQuery(GET_UNIT, {
    variables: { users: id },
    client: unitClient, // Use the unitClient
    errorPolicy: "all",
  });

  const { loading: councilLoading, error: councilError, data: councilData } = useQuery(GET_COUNCIL, {
    variables: { users: id },
    client: councilClient, // Use the unitClient
    errorPolicy: "all",
  });

  const name = user ? user.first_name : ""

  const navigateEditData = () => {
    navigate('/user/edit')
  }
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };
  const popoverContent = (
    <div>Your content here</div>
  )

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  const { logOut } = useAuth()

  if(error || councilError) {
    return (
      error && <div>{error.message}</div>,
      councilError && <div>{councilError.message}</div>
  )}

  if(loading || councilLoading) {
    return (
      <Loading />
    )}

  if(data && councilData) {
    return (
      <section>
        <div className="container">
          <div className="my-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="d-flex justify-content-around">
              <div className="col-7 my-4 infostand">
                <div className="infostand_data mt-2">
                  <h4 className="mx-2 mb-3"><strong>Welcome, {name}!</strong></h4>
                  <table className="table table-hover">
                    <tbody>
                      {data.GetUnitByUserId[0]?.name &&
                        <tr>
                          <td>Current Unit:</td>
                          <td><strong>{data.GetUnitByUserId[0].name}</strong></td>
                          <td className="fw-bold"><Link to="/unit">Unit Profile</Link></td>
                        </tr>
                      }
                      {councilData.GetCouncil[0]?.name &&
                        <tr>
                          <td>Union:</td>
                          <td><strong>{councilData.GetCouncil[0].name}</strong></td>
                          <td>go</td>
                        </tr>
                      }
                      <tr>
                        <td>Tokens:</td>
                        <td>14 Unics</td>
                        <td className="fw-bold" onClick={handlePopoverClick}><Link>Overview</Link></td>
                        <ReusablePopover
                          open={popoverOpen}
                          anchorEl={anchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'top',
                          }}
                          content={popoverContent}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-auto my-4">
                <Cropper />
              </div>
            </div>
            <div className="pb-4 text-center">
              <button className="btn btn-info" onClick={navigateEditData}>Edit user data</button>
              <button className="btn btn-warning mx-3" onClick={logOut}>Logout</button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-4 mx-2 divbg rounded-3 shadow-lg">
            <h4 className="p-4">Announcements</h4>
            <div>
              {/* Announcements flags: danger, success, warning */}
              <Announcement flag="warning" text="Your Union is ready to be created." link="/create-union" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="p-2 mx-2 divbg rounded-3 shadow-lg">
            <div className="d-flex flex-wrap justify-content-around p-2">
              <DashboardCard icon={moneyBill} text="Wallet" link="/wallet" />
              {/* {data?.GetCouncil[0].name && */}
                <DashboardCard icon={unit} text="Working Unit" link="/unit" />
              {/* // } */}
              <DashboardCard icon={council} text="Council" link="/council" />
              {/* {councilData?.GetCouncil[0].name ? */}
              <DashboardCard icon={union} text="Union" link="/union" />
               {/* :
              <DashboardCard icon={union} text="Create Union" link="/create-union" />
              } */}
              <DashboardCard icon={savings} text="Saving / Debt" link="/savings" />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
