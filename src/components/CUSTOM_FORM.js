import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { Form } from "../components/Form"

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

  const inputs = [
    { name: 'email', type: "text", onChange: handleInput },
    { name: 'password', type: "password", onChange: handleInput },
  ]

  const buttons = ['Login']

  return (
    <>
      <Form inputs={inputs} buttons={buttons} action={handleSubmitEvent} />
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
    </>




  );
};
