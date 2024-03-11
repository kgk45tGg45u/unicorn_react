import React from 'react'
import profilePlaceholder from '../assets/profile-image-placeholder.jpeg'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "";
  const email = user ? user.email : ""

  return (
    <section>
      <div className="container">
        <div className="container row my-4 p-2 divbg rounded-3 shadow-lg">
          <div className="col-7 p-1">
            <p>Welcome {name}</p>
            <p>email: {email}</p>
          </div>
          <div className="col-5 p-1">
            <img src={profilePlaceholder} alt="Profile" className="profile_img" />
          </div>
        </div>

        <div className="container my-1 p-2 divbg rounded-3 shadow-lg">
          <div className="row justify-content-md-center">
            <div className="col-3 col-md-3 text-center">
              <p>Tokens</p>
            </div>
            <div className="col-3 col-md-3 text-center">
              <p>Tokens</p>
            </div>
            <div className="col-3 col-md-3 text-center">
              <p>Tokens</p>
            </div>
            <div className="col-3 col-md-3 text-center">
              <p>Tokens</p>
            </div>
            <div className="col-3 col-md-3 text-center">
              <p>Tokens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
