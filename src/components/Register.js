import { useState } from "react";
import { toast } from 'react-toastify'
import { UserWizard1 } from '../components/new_user_wizard/NewUserWizard-1'
import { useAuth } from "../hooks/AuthProvider";

export const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { registerAction, registerOk } = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      registerAction(input);
    } else {
    toast.error("Please provide a valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {registerOk? <UserWizard1 /> : ""}
      <div className="py-4 h-100 d-flex align-items-center justify-content-center">
        <div className="bg-warning p-4 rounded-1">
          <form onSubmit={handleSubmitEvent}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Email address</label>
              <input type="email" name="email" id="email" className="form-control" onChange={handleInput} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" onChange={handleInput} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
