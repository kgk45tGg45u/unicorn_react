import { useFetchUnitByUser } from '../hooks/useFetchUnitByUser'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'

import profilePlaceholder from '../assets/profile-image-placeholder.jpeg'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id
  const { result: currentUnit, loading, error } = useFetchUnitByUser(id, "", "units", "GET");
  const name = user ? user.name : "";

  const { logOut } = useAuth()

  if(error) {
    return (
      <div>
        An error occured. Please login.
      </div>
    )}

  if(loading) {
    return (
      <div>
        Loding...
      </div>
    )}

  if(currentUnit) {
    return (
      <section>
        <div className="container">
          <div className="row my-4 p-2 divbg rounded-3 shadow-lg">
            <div className="col">
              <p>Welcome {name}</p>
              <p>Current Unit: {currentUnit.unit.title}</p>
              <button onClick={logOut}>Logout</button>
            </div>
            <div className="col-auto">
              <img src={profilePlaceholder} alt="Profile" className="profile_img" />
            </div>
          </div>

          <div className="my-1 p-2 divbg rounded-3 shadow-lg">
            <div className="row p-3">
              <div className="col-3 m-0 col-md-3 text-center">
                <div className="dashboard_icon">

                    <img className="icon_base" src={moneyBill} alt="Tokens" />
                    {/* <span className='indicator'>22</span> */}

                  <p>Wallet</p>
                </div>
              </div>
              <div className="col-3 m-0 col-md-3 text-center">
                <div className="dashboard_icon">
                  <img src={unit} alt="Working Unit" />
                  <p><Link to="/unit">Working Unit</Link></p>
                </div>
              </div>
              <div className="col-3 col-md-3 text-center">
                <div className="dashboard_icon">
                  <img src={council} alt="Workers Council" />
                  <p>Council</p>
                </div>
              </div>
              <div className="col-3 col-md-3 text-center">
                <div className="dashboard_icon">
                  <img src={union} alt="Workers Union" />
                  <p>Union</p>
                </div>
              </div>
              <div className="col-3 col-md-3 text-center">
                <div className="dashboard_icon">
                  <img src={savings} alt="Saving and Debt" />
                  <p>Saving / Debt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
