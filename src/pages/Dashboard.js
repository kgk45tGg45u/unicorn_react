import React from 'react'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "";
  const email = user ? user.email : ""

  return (
    <section>
      <div className="container">
        <div className="container my-4 p-4 divbg rounded-3 shadow-lg">
          <p>Welcome {name}</p>
          <p>email: {email}</p>
        </div>

        <div className="container my-1 p-4 divbg rounded-3 shadow-lg">
          <div className="row">
            <div className="col-1">
              <p>Tokens</p>
            </div>
            <div className="col-1">
              <p>Tokens</p>
            </div>
            <div className="col-1">
              <p>Tokens</p>
            </div>
            <div className="col-1">
              <p>Tokens</p>
            </div>
            <div className="col-1">
              <p>Tokens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
