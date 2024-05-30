import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
// import Placeholder from '../assets/profile-image-placeholder.jpeg';
import { Announcement } from '../components/Announcement'
import { DashboardCard } from '../components/DashboardCard'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import Cropper from '../components/ImageCropper'
import { Loading } from '../components/Loading';
import '../assets/UserProfile.css';

const unitClient = new ApolloClient({
  uri: 'http://localhost:3001/unit/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});

const GET_UNIT = gql`
  query GetUnitByUserId($members: ID!) {
    GetUnitByUserId(members: $members) {
      name
      id
    }
  }
`;

export const UnitProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id
  const { loading, error, data } = useQuery(GET_UNIT, {
    variables: { members: id },
    client: unitClient, // Use the unitClient
    errorPolicy: "all",
  });

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No unit found</div>;
  }

  console.log(data)
  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col-8">
    //       <p>{unit.unit.title}</p>
    //       <p>{unit.unit.address}</p>
    //       <button>edit</button>
    //     </div>
    //     <div className="col-4">
    //       <img className="profile_img" src={Placeholder} alt='unit profile' />
    //     </div>
    //   </div>
    // </div>
  <section>
  <div className="container">
    <div className="my-4 mx-2 divbg rounded-3 shadow-lg">
      <div className="d-flex justify-content-around">
        <div className="col-7 my-4 infostand">
          <div className="infostand_data mt-2">
            <h4 className="mx-2 mb-3"><strong>Welcome!</strong></h4>
            <table className="table table-hover">
              <tbody>
                {data.GetUnit[0]?.name &&
                  <tr>
                    <td>Current Unit:</td>
                    <td><strong>{data.getUnit[0].name}</strong></td>
                    <td className="fw-bold"><Link to="/unit">Unit Profile</Link></td>
                  </tr>
                }
                {data.GetCouncil[0]?.name &&
                  <tr>
                    <td>Union:</td>
                    <td><strong>{data.getUnit[0].name}</strong></td>
                    <td>go</td>
                  </tr>
                }
                <tr>
                  <td>Tokens:</td>
                  <td>14 Unics</td>
                  <td>Overview</td>
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
        {/* <button className="btn btn-info" onClick={navigateEditData}>Edit unit data</button> */}
        {/* <button className="btn btn-warning mx-3" onClick={logOut}>Logout</button> */}
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
</section>);
};
