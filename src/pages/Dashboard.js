import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loading } from '../components/Loading'
import ReusablePopover from '../components/ReusablePopover';
import profilePlaceholder from '../assets/profile-image-placeholder.jpeg'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import { DashboardCard } from '../components/DashboardCard'
// import unicornSymbol from '../assets/unicorn-symbol-2.png';

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id
  const [anchorEl, setAnchorEl] = useState(null);


  const navigate = useNavigate()
  const { result: currentUnit, loading, error } = useFetch(id, "", "units", "GET");
  const { result: currentUnion } = useFetch(id, "", "unions", "GET");
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

  if(error) {
    return (
      <div>{error}</div>
  )}

  if(loading) {
    return (
      <Loading />
    )}

  if(currentUnit && currentUnion) {
    // console.log({currentUnion})
    return (
      <section>
        <div className="container">
          <div className="row my-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="col my-4 infostand">
              <div className="infostand_data">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td><h4><strong>Welcome, {name}!</strong></h4></td>
                  </tr>
                  {currentUnit.unit?.title &&
                    <tr>
                      <td>Current Unit:</td>
                      <td><strong>{currentUnit.unit?.title}</strong></td>
                      <td>go</td>
                    </tr>
                  }
                  {currentUnion.union?.title &&
                    <tr>
                      <td>Union:</td>
                      <td><strong>{currentUnion.union?.title}</strong></td>
                      <td>go</td>
                    </tr>
                  }
                  <tr>
                    <td>Tokens:</td>
                    <td>14 Unics</td>
                    <td>go</td>
                  </tr>
                </tbody>
              </table>
                <button className="btn btn-info" onClick={navigateEditData}>Edit user data</button>
                <button className="btn btn-warning mx-3" onClick={logOut}>Logout</button>

              </div>
            </div>
            <div className="col-auto my-4">
              <img src={profilePlaceholder} alt="Profile" className="profile_img" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="p-2 mx-2 divbg rounded-3 shadow-lg">
            <div className="d-flex flex-wrap justify-content-around p-2">
              <DashboardCard icon={moneyBill} text="Wallet" onClick={handlePopoverClick}/>
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
              {currentUnit.unit?.title && <DashboardCard icon={unit} text="Working Unit" link="/unit" />}
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
