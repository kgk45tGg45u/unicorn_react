export const XputCard = (props) => {
  return (
    <div className="xput_card_wrapper">
      <div className="xput_card_title">
        <h5>{props.title}</h5>
      </div>
      <div className="xput_list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
          </thead>
        <tbody>
          <tr>
            <td>Responsible:</td>
            <td>sldkjghskjdg</td>
            <td>Profile</td>
          </tr>
          <tr>
            <td>Working Unit:</td>
            <td><strong>fkgjhskjghsk</strong></td>
            <td>Unit profile</td>
          </tr>
        </tbody>
      </table>
        {/* <div className="xput_list_title">

        </div>
        <div className="xput_list_item">

        </div> */}
      </div>
    </div>
  )
}
