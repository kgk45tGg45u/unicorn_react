import { Link } from "react-router-dom"

export const Announcement = (props) => {
  if (props.flag === "danger") {
    return (
      <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {props.text} <Link to={props.link}><strong>Click here</strong></Link> to fix this.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )}

  if (props.flag === "warning") {
    return (
      <>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {props.text} <strong>Click here</strong> to fix this.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )}

  if (props.flag === "success") {
    return (
      <>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {props.text} <strong>Click here</strong> to fix this.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </>
    )}

}
