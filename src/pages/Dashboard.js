import React from 'react'
// import { useAuth } from '../hooks/AuthProvider'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "";

  return (
    <section>
      <div className="container">
        <p>Welcome {name}</p>
      </div>
    </section>
  )
}
