import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res)
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Provide feedback to the user about the login failure
    }
  };

  const registerAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        // Provide feedback to the user about the registration
        console.log(res.message);
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      // Provide feedback to the user about the registration failure
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};
