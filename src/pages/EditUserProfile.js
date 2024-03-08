import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
// import Placeholder from '../assets/profile-image-placeholder.jpeg'
import '../assets/UserProfile.css'

export const EditUserProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id
  const { result: user, loading } = useFetch(id, "", "users", "GET"); // Destructure loading from useFetch result
  console.log(user);
  console.log(user)

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  // const [input, setInput] = useState({user});
  // console.log(user)

  // useFetch(input.id, input, input.id, "PUT");
  // console.log("Successfully sent info to Fetch hook")

  // const handleUserEdit = () => {
  //   const editedUser = useFetch(1, input, 1, "PUT");
  // }

  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setInput((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   console.log(input)
  //   setUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="container">
        <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form>

          {/* <!-- Name input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Name</label>
            <input type="email" name="email" id="email" value={user.user.name} className="form-control" />
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" value={user.user.email} className="form-control" />
          </div>

          {/* <!-- address input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="address">Address</label>
            <input type="address" name="address" id="address" value={user.user.address} className="form-control" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="phone">Phone</label>
            <input type="phone" name="phone" id="phone" value={user.user.phone} className="form-control" />
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className="form-control" />
          </div>

          {/* <!-- 2 column grid layout for inline styling --> */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* <!-- Checkbox --> */}
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
              </div>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Update</button>
        </form>
      </div>
    </div>
  </div>
)}
