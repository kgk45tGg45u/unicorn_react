import { useFetchUnitByUser } from '../hooks/useFetchUnitByUser'
import { useAuth } from '../hooks/AuthProvider'

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
  const { result: currentUnit, loading, error } = useFetchUnitByUser(id, "", "units", "GET");
  const name = user ? user.name : "";
  const unicornSymbolStyle = {
    width: 13,
    opacity: 0.9
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

  if(currentUnit) {
    return (
      <section>
        <div className="container">
          <div className="row my-4 mx-2 divbg rounded-3 shadow-lg">
            <div className="col my-4 infostand">
              <div className="infostand_data">
                <h3>{name}</h3>
                <h4>Current Unit: {currentUnit.unit.title}</h4>

                <h5>Tokens: 14 Unics</h5>


                </div>

              <button onClick={logOut}>Logout</button>
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
