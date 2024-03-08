import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
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
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site", res.token);
        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))
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
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        throw new Error("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      // Provide feedback to the user about the registration failure
    }
  };

  const editUser = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        // Provide feedback to the user about the registration
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
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, registerAction, editUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};
