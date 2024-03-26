// import {useState } from 'react'
import { Link } from "react-router-dom"

export const DashboardCard = (props) => {
  // const [hidden, setHidden] = useState(true);

  return (
    <>
      <Link to={props.link}>
      <div
      className="dashboard_icon"
      // onMouseEnter ={() => setHidden(false)}
      // onMouseOut ={() => setHidden(true)}
      >
        <img src={props.icon} alt="Tokens" />
          {/* <span className='indicator'>22</span> */}
        <p>{props.text}</p>
      </div>
      </Link>
    </>
  )
}
