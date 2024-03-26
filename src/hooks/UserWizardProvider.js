import { useContext, createContext, useEffect, useReducer } from "react";
import { userReducer } from "./userWizardReducer";
import { toast } from "react-toastify";

const initialState = {
  userData: []
}

const UserWizardContext = createContext(initialState);

const currentUser = JSON.parse(localStorage.getItem("user"))
const id = currentUser.id

export const UserWizardProvider = ({ children }) => {

  const [state, dispatch] = useReducer(userReducer, initialState);

  const record = async (data) => {
    console.log(data)
    try {
      // Make a POST request to save the data to the backend
      const response = await fetch("http://localhost:3001/users/add-from-wizard", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // If the request is successful, update the local state with the new data
        const updatedUserData = state.userData.concat(data);
        toast.info('User Data updated!')
        dispatch({
          type: "RECORD_USER_DATA",
          payload: {
            userData: updatedUserData
          }
        });
        // Provide feedback to the user about the successful record
      } else {
        throw new Error("Failed to save data to the backend");
      }
    } catch (error) {
      console.error("Error saving data to the backend:", error);
      // Provide feedback to the user about the error in saving data
    }
  }

  useEffect(() => {
    console.log("Data in UserWizardProvider:", state.userData);
  }, [state]);

  return (
    <UserWizardContext.Provider value={{ record, userData: state.userData }}>
      {children}
    </UserWizardContext.Provider>
  );

};

export const useUserWizard = () => {
  return useContext(UserWizardContext);
};
