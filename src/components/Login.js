import { useState, useContext } from "react";
import { useAuth } from "../hooks/AuthProvider";

export const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loginAction } = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      loginAction(input); // Call login action from AuthProvider with input
      return;
    }
    alert("Please provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form onSubmit={handleSubmitEvent}>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example1">Email address</label>
            <input type="email" name="email" id="form2Example1" className="form-control" onChange={handleInput} />
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form2Example2">Password</label>
            <input type="password" name="password" id="form2Example2" className="form-control" onChange={handleInput}/>
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
            <p>Not a member? <a href="#!">Register</a></p>
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
  );
};
