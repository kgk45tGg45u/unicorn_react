import React from 'react'
// import { useAuth } from '../hooks/AuthProvider'
import { EditUserProfile } from './EditUserProfile.js'

export const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user ? user.name : "";
  const email = user ? user.email : ""

//   fetch(`http://localhost:3001/users/2`)
//   .then((response) => {
//     if(!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`)
//     }

//     return response.text()
//     .then((text) => {
//     user.id = text;
//     console.log(text)
//     })

//   // Catch any errors that might happen, and display a message
//   // in the `poemDisplay` box.
//   // .catch((error) => {
//   //   poemDisplay.textContent = `Could not fetch verse: ${error}`;
//   // })
// });


  return (
    <section>
      <div className="container">
        <p>Welcome {name}</p>
        <p>email : {email}</p>
        {/* <UploadImage /> */}
      </div>
    </section>
  )
}
