import { useContext, createContext, useEffect, useReducer } from "react";
import { userReducer } from "./userWizardReducer";
import { toast } from "react-toastify";

const initialState = {
  userData: []
}

const UserWizardContext = createContext(initialState);

const currentUser = JSON.parse(localStorage.getItem("user"))

export const UserWizardProvider = ({ children }) => {
  const id = currentUser.id

  const [state, dispatch] = useReducer(userReducer, initialState);

  const record = async (data) => {
    const { workingYesNo, producingYesNo, product1title, hasService, serviceName, hasUnit, currentProductionUnit, newProductionUnitName, councilName } = data
    console.log(data)
    data.id = id

    // Add working boolean to the the user
    try {
      const response = await fetch("http://localhost:3001/users/add-personal-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workingYesNo),
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

    // Create Unit if necessary
    if (hasUnit && hasUnit === "Yes") {
      try {
        const response = await fetch("http://localhost:3001/units", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id, currentProductionUnit),
        });
        if (response.ok) {
          toast.info('Added member to the working unit!')
        } else {
          throw new Error("Failed to save data to the backend");
        }
      } catch (error) {
        console.error("Error saving data to the backend:", error);
        // Provide feedback to the user about the error in saving data
      }
    // edit unit
    } else if (hasUnit && hasUnit === "No") {
      try {
        const response = await fetch("http://localhost:3001/units/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id, newProductionUnitName),
        });
        if (response.ok) {
          toast.info('New unit successfully created!')
        } else {
          throw new Error("Failed to save data to the backend");
        }
      } catch (error) {
        console.error("Error saving data to the backend:", error);
        // Provide feedback to the user about the error in saving data
      }
    }

    // Adding has_product and has_service booleans to unit if applicable.
    if (hasService || producingYesNo){
      try {
        const response = await fetch("http://localhost:3001/units-service-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id, producingYesNo, hasService),
        });
        if (response.ok) {
          toast.info('New unit successfully created!')
        } else {
          throw new Error("Failed to save data to the backend");
        }
      } catch (error) {
        console.error("Error saving data to the backend:", error);
        // Provide feedback to the user about the error in saving data
      }
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
}

export const useUserWizard = () => {
  return useContext(UserWizardContext);
};
