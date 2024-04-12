import { useState } from "react";
import { toast } from 'react-toastify'
import { UserWizard1 } from '../components/new_user_wizard/NewUserWizard-1'

export const Register = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [ok, setOk] = useState(false)

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response.ok) {
        toast.info("User created successfully");
        setOk(true)
      } else {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Couldn't register the new user!");
      // Handle the error, e.g., display an error message to the user
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
      {ok? <UserWizard1 /> : ""}
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
