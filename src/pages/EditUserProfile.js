import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import '../assets/UserProfile.css'
import { useNavigate } from 'react-router-dom'

export const EditUserProfile = () => {
  const [load, setLoad] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id
  const navigate = useNavigate()
  const { result: user, loading } = useFetch(id, "", "users", "GET"); // Destructure loading from useFetch result

  useEffect(() => {
    setLoad(true)
  }, [loading])

  const handleUserEdit = (e) => {
    e.preventDefault()
    const newData = {
      id: currentUser.id,
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      phone: e.target.elements.phone.value,
      address: e.target.elements.address.value
    }
      console.log(newData)
      navigate("/sending", { state: { value: newData } });
    }

  if (!load) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  if (load) {
    return (
    <div className="container">
        <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form onSubmit={handleUserEdit}>

          {/* <!-- Name input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">Name</label>
            <input type="name" name="name" id="name" defaultValue={user.user.name} className="form-control" />
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" defaultValue={user.user.email}className="form-control" />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="phone">Phone</label>
            <input type="phone" name="phone" id="phone" defaultValue={user.user.phone} className="form-control" />
          </div>

          {/* <!-- password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="address">Address</label>
            <input type="address" name="address" id="address" defaultValue={user.user.address} className="form-control" />
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
}
