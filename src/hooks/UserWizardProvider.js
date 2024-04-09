import { useContext, createContext } from "react";
import { toast } from "react-toastify";

const initialState = {
  userData: []
}

const UserWizardContext = createContext(initialState);
const currentUser = JSON.parse(localStorage.getItem("user"))

export const UserWizardProvider = ({ children }) => {
  const id = currentUser.id

  const record = async (data) => {
    const { workingYesNo } = data
    console.log(data)
    data.id = id

    // Add working boolean to the the user
    if (workingYesNo) {
      try {
        const response = await fetch("http://localhost:3001/users/add-work", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id: 1, workingYesNo: false}),
        });
        if (response.ok) {
          // If the request is successful, update the local state with the new data
          toast.info('User Data updated!')
          // Provide feedback to the user about the successful record
        } else {
          throw new Error("Failed to save data to the backend");
        }
      } catch (error) {
        toast.info("Error saving data to the backend.");
        // Provide feedback to the user about the error in saving data
      }
    }
  }


  // useEffect(() => {
  //   console.log("Data in UserWizardProvider:", state.userData);
  // }, [state]);

  return (
    <UserWizardContext.Provider value={{ record }}>
      {children}
    </UserWizardContext.Provider>
  );
}

export const useUserWizard = () => {
  return useContext(UserWizardContext);
};
