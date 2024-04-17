import '../assets/home.css'
import { Link } from "react-router-dom";
import { HomeCard } from '../components/HomeCard'
import handshake from '../assets/SVG/handshake-solid.svg'
import shop from '../assets/SVG/shop-solid.svg'
import users from '../assets/SVG/users-gear-solid.svg'

export const Home = () => {
  // const id = null
  // const { result: noOfUsers, loading, error } = useFetch(id, "", "users", "GET");
  // const log = useEffect() => {()[]}
  // useEffect(() => {
  //   console.log("Data in in Home.js:", noOfUsers);
  // }, [noOfUsers]);

  return (
    <section>
      <div>
        <div className="banner p-5" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/img/Sahara_desert_sunrise.jpg'})`
        }}>
          <h1>Creating a planned <strong>Socialist Economy</strong> for <strong>everyone</strong>!</h1>
          <p>Modelling the future of labor, market and planning with the help of smart designs.</p>
          <Link to="/login" className="mx-4 btn btn-danger">Join now</Link>
        </div>
        <div className="p-0 unicorn_banner">
          <p>UNICORN - The Home of Work</p>

          <div className="subtext_banner">
          <p>From each according to their ability,</p>
          <p>To whom according to their need...</p>
        </div>
        </div>

        <div className="d-flex m-4 align-content-start justify-content-evenly flex-wrap">
          <div className="col-md-3 divbg col-sm-12 homeCard p-3 border m-4 shadow">
            <HomeCard img={shop} text="Unicorn's pseudo-market makes transactions easier and payments safer." alt="Pseudo-market" />
          </div>
          <div className="col-md-3 divbg col-sm-12 homeCard p-3 border m-4 shadow">
            <HomeCard img={handshake} text="Smart contracts makes it easier for everyone to start their business online." alt="Free contracts" />
          </div>
          <div className="col-md-3 divbg col-sm-12 homeCard p-3 border m-4 shadow">
          <HomeCard img={users} text="Socialism means you shop with lower prices and work for yourself and your community." alt="Socialism" />
          </div>
        </div>
      </div>
    </section>
  )
}
