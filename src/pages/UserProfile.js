import { useState } from 'react'
import { useAuth } from '../hooks/AuthProvider'
import Placeholder from '../assets/profile-image-placeholder.jpeg'
import '../assets/UserProfile.css'

export const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [input, setInput] = useState({
    id: user.id,
    name: user.name,
    phone: user.phone,
    address: user.address,
    email: user.email,
    password: user.password,
  });

  const { editUser } = useAuth();

  const handleUserEdit = (e) => {
    e.preventDefault()
    if (input.email !== "" && input.password !== "") {
      editUser(input);
      console.log("Successfully sent info to Authprovider")
      return;
    }
    alert("Please provide a valid input");
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(input)
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <p>{input.name}</p>
          <p>{input.address}</p>
          <p>{input.phone}</p>
          <button>edit</button>
        </div>





        <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form onSubmit={handleUserEdit}>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" value={input.email} className="form-control" onChange={handleInput} />
          </div>

          {/* <!-- address input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="address">Address</label>
            <input type="address" name="address" id="address" value={input.address} className="form-control" onChange={handleInput} />
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={input.password} className="form-control" onChange={handleInput}/>
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

            <div className="col">
              {/* <!-- Simple link --> */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>
          </div>
        </form>
      </div>
    </div>








        <div className="col-4">
          <img className="profile_img" src={Placeholder} alt='user profile' />
        </div>
      </div>
    </div>
  )
}
