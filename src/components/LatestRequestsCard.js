export const LatestRequestsCard = (props) => {
  return (
    <div className="latest_requests_card_wrapper">
      <div className="latest_requests_card">
        <h5>{props.title}</h5>
        <div>{props.tickets}</div>
        <div className="requests_card_buttons">
          <div className="request_card_button">
            <button>{props.button1}</button>
          </div>
          <div className="request_card_button">
            <button>{props.button2}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
