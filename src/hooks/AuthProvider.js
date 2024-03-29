import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
        console.log(token)
        localStorage.setItem("site", res.token);

        // function setWithExpiry(key, value, ttl) {
        //   const now = new Date()

        //   // `item` is an object which contains the original value
        //   // as well as the time when it's supposed to expire
        //   const item = {
        //     value: value,
        //     expiry: now.getTime() + ttl,
        //   }
        //   localStorage.setItem(key, JSON.stringify(item))
        // }

        // function getWithExpiry(key) {
        //   const itemStr = localStorage.getItem(key)
        //   // if the item doesn't exist, return null
        //   if (!itemStr) {
        //     return null
        //   }
        //   const item = JSON.parse(itemStr)
        //   const now = new Date()
        //   // compare the expiry time of the item with the current time
        //   if (now.getTime() > item.expiry) {
        //     // If the item is expired, delete the item from storage
        //     // and return null
        //     localStorage.removeItem(key)
        //     return null
        //   }
        //   return item.value
        // }


        setUser(res.user)
        localStorage.setItem("user", JSON.stringify(res.user))

        // toast.success('🦄 Wow so easy!', {
        //   position: "bottom-right",
        //   autoClose: 1400,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   transition: Bounce,
        //   });

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
      if (res.message) {
        // Provide feedback to the user about the registration
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        toast('Registration failed.');
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
    <AuthContext.Provider value={{ token, user, loginAction, registerAction, editUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};
