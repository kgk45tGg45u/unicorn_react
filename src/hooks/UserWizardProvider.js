import { useContext, createContext, useState, useEffect, useReducer } from "react";
import { userReducer } from "./userWizardReducer";
import { useNavigate } from "react-router-dom";

const initialState = {
  userData: []
}

const UserWizardContext = createContext(initialState);

export const UserWizardProvider = ({ children }) => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  // const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [state, dispatch] = useReducer(userReducer, initialState);
  const navigate = useNavigate();

  const record = (data) => {
    const updatedUserData = state.userData.concat(data);

    dispatch({
        type: "RECORD_USER_DATA",
        payload: {
            userData: updatedUserData
        }
    })

}



  // };
  useEffect(() => {
    console.log("Data in UserWizardProvider:", state.userData);
  }, [state]);

  // const editUser = async (data) => {
  //   try {
  //     const response = await fetch("http://localhost:3001/users", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     const res = await response.json();
  //     if (res.message) {
  //       // Provide feedback to the user about the registration
  //     } else {
  //       throw new Error("Registration failed");
  //     }
  //   } catch (err) {
  //     console.error("Registration error:", err);
  //     // Provide feedback to the user about the registration failure
  //   }
  // };

  return (
    <UserWizardContext.Provider value={{ record, userData: state.userData }}>
      {children}
    </UserWizardContext.Provider>
  );

};

export const useUserWizard = () => {
  return useContext(UserWizardContext);
};
