import { useState } from "react";

export const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        alert("User created successfully");
        // Optionally, you can redirect the user to another page after successful registration
      } else {
        const data = await response.json();
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
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
    <div className="py-4 h-100 d-flex align-items-center justify-content-center">
      <div className="bg-warning p-4 rounded-1">
        <form onSubmit={handleSubmitEvent}>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className="form-control" onChange={handleInput} />
          </div>
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
  );
};
