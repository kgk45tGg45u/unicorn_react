import '../assets/home.css'
import { Link } from "react-router-dom";

export const Home = () => {

  return (
    <section>
      <div className="p-4 container">
        <div className="banner divbg p-4" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/img/Sahara_desert_sunrise.jpg'})`
        }}>
          <h1 className="p-4 text-white">Creating a planned <strong>Socialist Economy</strong> for <strong>everyone</strong>!</h1>
          <p className="p-4">Modelling the future of labor, market and planning with the help of smart designs.</p>
          <Link to="/login" className="mx-4 btn btn-danger">Join now</Link>
        </div>
      </div>
    </section>
  )
}
