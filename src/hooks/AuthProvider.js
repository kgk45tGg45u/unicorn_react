import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [registerOk, setRegisterOk] = useState(false)
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
        console.log(token)
        localStorage.setItem("site", res.token);
        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))
        toast('Login Successful!')
        navigate("/dashboard");
      } else {
        toast('Login Failed!')
      }
    } catch (err) {
      toast(err)
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
      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site", res.token);
        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))
        setRegisterOk(true)
        toast('Registeration Successful!')
      } else {
        toast('Login Failed!')
      }
    } catch (err) {
      toast.error("Registration error:", err)
      // Provide feedback to the user about the registration failure
    }
  };

  const editUser = async (data, method) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: `${method}`,
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
      toast.error("Registration error:", err);
      // Provide feedback to the user about the registration failure
    }
  };

  const logOut = () => {
    toast('Logout Successful!')
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user"); // Remove user data from local storage
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, registerOk, loginAction, registerAction, editUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};
