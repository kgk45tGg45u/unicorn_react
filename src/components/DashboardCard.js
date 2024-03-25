import { Link } from "react-router-dom"

export const DashboardCard = (props) => {
  return (
    <>
    <Link to={props.link}>
    <div className="dashboard_icon">

        <img className="icon_base" src={props.icon} alt="Tokens" />
        {/* <span className='indicator'>22</span> */}
      <p>{props.text}</p>
    </div>
    </Link>

  </>
  )
}
