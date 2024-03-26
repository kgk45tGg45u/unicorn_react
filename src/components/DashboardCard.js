// import {useState } from 'react'
import { Link } from "react-router-dom"
// import BasicModal from "./Popover"

export const DashboardCard = (props) => {
  // const [hidden, setHidden] = useState(true);

  return (
    <section>
      {props.link ? (
        <Link to={props.link}>
          <div
            onClick={props.onClick}
            className="dashboard_icon"
            // onMouseEnter ={() => setHidden(false)}
            // onMouseOut ={() => setHidden(true)}
          >
            <img src={props.icon} alt="Tokens" />
            {/* <span className='indicator'>22</span> */}
            <p>{props.text}</p>
          </div>
        </Link>
      ) : (<div
        onClick={props.onClick}
        className="dashboard_icon"
        // onMouseEnter ={() => setHidden(false)}
        // onMouseOut ={() => setHidden(true)}
      >
        <img src={props.icon} alt="Tokens" />
        {/* <span className='indicator'>22</span> */}
        <p>{props.text}</p>
      </div>
    )}
    </section>
  )
}
