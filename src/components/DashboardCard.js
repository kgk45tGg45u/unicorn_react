import { Link } from "react-router-dom"

export const DashboardCard = (props) => {
  return (
    <section>
      {props.link ? (
        <Link to={props.link}>
          <div
            onClick={props.onClick}
            className="dashboard_icon"
          >
            <img src={props.icon} alt={props.text} />
            {/* <span className='indicator'>22</span> */}
            <p>{props.text}</p>
          </div>
        </Link>
      ) : (<div
        onClick={props.onClick}
        className="dashboard_icon"
      >
        <img src={props.icon} alt={props.text} />
        {/* <span className='indicator'>22</span> */}
        <p>{props.text}</p>
      </div>
    )}
    </section>
  )
}
