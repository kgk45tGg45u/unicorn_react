import { useFetchUnitByUser } from '../hooks/useFetchUnitByUser'
import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'

import profilePlaceholder from '../assets/profile-image-placeholder.jpeg'
import moneyBill from '../assets/SVG/money-bill-solid.svg'
import unit from '../assets/SVG/industry-solid.svg'
import council from '../assets/SVG/arrows-to-dot-solid.svg'
import union from '../assets/SVG/building-flag-solid.svg'
import savings from '../assets/SVG/piggy-bank-solid.svg'
import { DashboardCard } from '../components/DashboardCard'
// import { EditUserProfile } from './EditUserProfile'
// import unicornSymbol from '../assets/unicorn-symbol-2.png';


export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id
  const navigate = useNavigate()
  const { result: currentUnit, loading, error } = useFetchUnitByUser(id, "", "units", "GET");
  const { result: currentUnion, loadingUnion, errorUnion } = useFetchUnitByUser(id, "", "unions", "GET");
  const name = user ? user.name : "";
  // const unicornSymbolStyle = {
  //   width: 13,
  //   opacity: 0.9
  // }
  const navigateEditData = () => {
    navigate('/user/edit')
  }

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

  if(currentUnit && currentUnion) {
    return (
      <section>
        <div className="container">
          <div className="row my-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="col my-4 infostand">
              <div className="infostand_data">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td><h4><strong>{name}</strong></h4></td>
                  </tr>
                  <tr>
                    <td>Current Unit:</td>
                    <td><strong>{currentUnit.unit.title}</strong></td>
                    <td>go</td>
                  </tr>
                  <tr>
                    <td>Union:</td>
                    <td><strong>{currentUnion.union.title}</strong></td>
                    <td>go</td>
                  </tr>
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
