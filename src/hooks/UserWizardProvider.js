import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserWizardContext = createContext();

export const UserWizardProvider = ({ children }) => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  // const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [recordData, setRecordData] = useState(null)
  const navigate = useNavigate();

  const record = (data) => {
    setRecordData(prevData => ({
      ...prevData,
      data
    }));
    // setRecordData(data)

  };
  useEffect(() => {
    console.log("Data in UserWizardProvider:", recordData);
  }, [recordData]);

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

  return (
    <UserWizardContext.Provider value={{ record, recordData, editUser }}>
      {children}
    </UserWizardContext.Provider>
  );

};

export const useUserWizard = () => {
  return useContext(UserWizardContext);
};
