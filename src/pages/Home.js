import '../assets/home.css'
import { Link } from "react-router-dom";
import { useFetch } from '../hooks/useFetch'
import { useEffect } from 'react'

export const Home = () => {
  const id = null

  const { result: noOfUsers, loading, error } = useFetch(id, "", "users", "GET");
  // const log = useEffect() => {()[]}
  useEffect(() => {
    console.log("Data in in Home.js:", noOfUsers);
  }, [noOfUsers]);


  if(loading) {
    return (
      <div>Loading...</div>
    )
  }

  if(error) {
    return (
      <div>error</div>
    )
  }

  if(noOfUsers) {
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

        <div className="d-flex m-4 align-content-start justify-content-evenly flex-wrap">
          <div className="col-md-4 divbg col-sm-12 homeCard p-3 border m-4 shadow">
            <h3 className="h3">Unicorn 0.1</h3>
            <ul>
              <li>currently serving {noOfUsers.length} users</li>
              <li>integrating work and politics in an online App</li>
              <li>Access to all the data for everyone with the help of block-chain.</li>
            </ul>
            {/* <button className="btn btn-danger">Logout</button> */}
          </div>
          <div className="col-md-4 divbg col-sm-12 homeCard p-3 border m-4 shadow">
            <h3 className="h3">Unicorn 0.1</h3>
            <ul>
              <li>currently serving 1549 users</li>
              <li>integrating work and politics in an online App</li>
              <li>Access to all the data for everyone with the help of block-chain.</li>
            </ul>
            {/* <button className="btn btn-danger">Logout</button> */}
          </div>
          <div className="col-md-4 divbg col-sm-12 homeCard p-3 border m-4 shadow">
            <h3 className="h3">Unicorn 0.1</h3>
            <ul>
              <li>currently serving 1444 users</li>
              <li>integrating work and politics in an online App</li>
              <li>Access to all the data for everyone with the help of block-chain.</li>
            </ul>
            {/* <button className="btn btn-danger">Logout</button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
}
