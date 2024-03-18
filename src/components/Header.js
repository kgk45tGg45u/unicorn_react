import { useAuth } from '../hooks/AuthProvider'
import { Link, NavLink } from "react-router-dom";
// import Placeholder from '../assets/profile-image-placeholder.jpeg';
// import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
// import { useCart } from "../../context";

export const Header = () => {
  // const [dropdown, setDropdown] = useState(false);
  // const token = JSON.parse(sessionStorage.getItem("token"));
  const { user, logOut, loginAction } = useAuth()

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div className="container-fluid">
          <a className="navbar-brand me-5" href="/">Unicorn 1.0</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
                {!user ?
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="#">Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Collaboration</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Development</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Log on to the cloud</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                <div className="dropdown-menu">
                  <NavLink className="dropdown-item" to="#">Action</NavLink>
                  <NavLink className="dropdown-item" to="#">Another action</NavLink>
                  <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">Separated link</Link>
                </div>
              </li>
            </ul>
              :
              <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Wallet</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Council</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</Link>
                <div className="dropdown-menu">
                  <NavLink className="dropdown-item" to="#">Action</NavLink>
                  <NavLink className="dropdown-item" to="#">Another action</NavLink>
                  <NavLink className="dropdown-item" to="#">Something else here</NavLink>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">Separated link</Link>
                </div>
              </li>
            </ul>
              }
            <form className="d-flex">
              { user ? <button onClick={logOut} className="btn btn-secondary my-2 my-sm-1" type="submit">Logout</button> : <button onClick={loginAction} className="btn btn-secondary my-2 my-sm-1" type="submit">Login</button>}
              {/* <input className="form-control me-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> */}
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}
