import React from 'react'
// import { useAuth } from '../hooks/AuthProvider'
import { EditUserProfile } from './EditUserProfile.js'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "";
  const email = user ? user.email : ""

  return (
    <section>
      <div className="container">
        <p>Welcome {name}</p>
        <p>email: {email}</p>
        {/* <UploadImage /> */}
      </div>
    </section>
  )
}
