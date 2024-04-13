import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import '../../assets/wizard.css';
import { useFetch } from '../../hooks/useFetch';
import { Loading } from '../Loading';
import { formConfigurations } from './NewUserFormConfigurations';

export const UserWizard2 = () => {
  const [moves, setMoves] = useState(false);
  const navigate = useNavigate()
  const { result: allUnits, loading, error } = useFetch("", "", "all-units", "GET")
  const [currentConfigurationIndex, setCurrentConfigurationIndex] = useState(1);
  let inputData = useRef(null)
  const inputRadioRefs = useRef({});
  const [data, setData] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"))
  let tryExecuted = false
  const requestBody = {
    ...data, // Existing key-value pairs in the data object
    id: currentUser.id // Add user ID to the request
  };

  const submit = async (data) => {
    // Updating Working boolean for user.
    if (!tryExecuted) {
      try {
        console.log("Running the first function.")
        const response = await fetch("http://localhost:3001/users/add-work", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          toast.info('User Data updated!')
          tryExecuted = true
        } else {
          toast.error("Failed to update user data!");
        }
      } catch (error) {
        toast.error("Error saving data to the backend.");
      }
    }

    if (tryExecuted) {
      // Logic to record all other information
      if (data.newProductionUnitName){
        try {
          console.log("Running the second function.")
          const response = await fetch("http://localhost:3001/units/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          if (response.ok) {
            toast.info('Production unit successfully created!')
            tryExecuted = true
          } else {
            toast.error("Failed to create production unit!");
          }
        } catch (error) {
          toast.error("Error saving data to the backend.");
        }
      } else if (data.currentProductionUnit) {
        try {
          console.log("Running the third function.")
          const response = await fetch("http://localhost:3001/units", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          if (response.ok) {
            toast.info('Production unit changed successfully!')
            tryExecuted = true
          } else {
            toast.error("Failed to edit production unit data!");
          }
        } catch (error) {
          toast.error("Error saving data to the backend.");
        }
      }
    }

    if (tryExecuted){
      if (data.producingYesNo || data.hasService) {
        try {
          console.log("Running the fourth function.")
          const response = await fetch("http://localhost:3001/units-service-product", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          if (response.ok) {
            toast.info('Production unit changed successfully!')
            tryExecuted = true
          } else {
            toast.error("Failed to edit production unit data!");
          }
        } catch (error) {
          toast.error("Error saving data to the backend.");
        }
      }
    }

    if (tryExecuted && data.councilName) {
      try {
        console.log("Running the fifth function.")
        const response = await fetch("http://localhost:3001/councils/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          toast.info('Working Council created successfully!')
          const council_id = response.council_id
          console.log("Council ID:", council_id)
          tryExecuted = true
        } else {
          toast.error("Failed to create working council or adding the user to it!");
        }
      } catch (error) {
        toast.error("Error saving data to the backend.");
      }
    }

    if (tryExecuted) {
      if (data.product1title || data.hasService) {
        try {
          console.log("Running the sixth function.")
          const response = await fetch("http://localhost:3001/units-service-product", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
          if (response.ok) {
            toast.info('Working Council created successfully!')
            tryExecuted = true
          } else {
            toast.error("Failed to create working council or adding the user to it!");
          }
        } catch (error) {
          toast.error("Error saving data to the backend.");
        }
      }
    }
  }

  const action = (e) => {
    e.preventDefault();

    setMoves(true)
    if(currentConfigurationIndex === 1 && data.workingYesNo === "No"){
      console.log("The end")
      submit(data)
      navigate('/dashboard')
    }

    if(currentConfigurationIndex === 1 && data.workingYesNo === "Yes"){
      setCurrentConfigurationIndex(2);
    }

    if(currentConfigurationIndex === 2 && data.workingYesNo === "Yes"){
      setCurrentConfigurationIndex(3);
    }

    if(currentConfigurationIndex === 2 && data.producingYesNo === "Yes"){
      setCurrentConfigurationIndex(3);
    }

    if(currentConfigurationIndex === 2 && data.producingYesNo === "No"){
      setCurrentConfigurationIndex(4);
    }

    // Product name
    if(currentConfigurationIndex === 3){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      setCurrentConfigurationIndex(4);
    }

    // Offering service?
    if(currentConfigurationIndex === 4 && data.producingYesNo === "No" && data.hasService === "No"){
      console.log("the end")
      submit({working: false})
      navigate('/dashboard')
    }

    if(currentConfigurationIndex === 4 && data.producingYesNo === "Yes" && data.hasService === "No"){
      setCurrentConfigurationIndex(6);
    }

    // Offering service?
    if(currentConfigurationIndex === 4 && data.hasService === "Yes"){
      setCurrentConfigurationIndex(5);
    }

    // Service name
    if(currentConfigurationIndex === 5){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      setCurrentConfigurationIndex(6);
    }

    // Has unit?
    if(currentConfigurationIndex === 6 && data.hasUnit === "I work alone"){
      setCurrentConfigurationIndex(8);
    }

    if(currentConfigurationIndex === 6 && data.hasUnit === "I work in a team"){
      setCurrentConfigurationIndex(7);
    }

    // Unit name if has (this part has to change to a dropdown menu)
    if(currentConfigurationIndex === 7){
      submit(data)
      navigate('/dashboard')
    }

    if(currentConfigurationIndex === 8){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value,
        councilName: data.newProductionUnitName + " Council"
      }));
      setCurrentConfigurationIndex(9);
    }

    // Council name
    if(currentConfigurationIndex === 9){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      console.log("the end")
      submit(data)
      navigate('/dashboard')
    }

    if(currentConfigurationIndex === 10){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      console.log("the end")
      submit(data)
    }
  }

  useEffect(() => {
    console.log("data: ", data);
  }, [data])

  const currentConfiguration = formConfigurations[currentConfigurationIndex];



  if(loading) {
    return(<Loading />)
  }

  if(error) {
    toast.error("Error getting units names.")
  }

  if(allUnits) {
    return (
      <div className="py-4 d-flex align-items-center justify-content-center">
        <div className="wcontainer2 rounded-3 shadow-lg">
          <div className="mt-4 mb-3 mx-4 text-white">
            <h2>Work Data</h2>
          </div>
          <form className="form-inline my-3 mx-4">
            <div className="form-group mx-sm-3 mb-2 font-weight-bold">
              {(currentConfiguration.input_type === "text") &&
              <div className={`form-inline my-3 mx-4 ${moves ? 'form-animation' : ''}`}>
                <label htmlFor={currentConfiguration.input_id} className="text-white my-3">{currentConfiguration.grand_label}</label>
                <input
                  type={currentConfiguration.input_type}
                  name={currentConfiguration.input_id}
                  className="form-control"
                  id={currentConfiguration.input_id}
                  ref={inputData}
                  onChange={(e) => {
                    setData({ ...data, [currentConfiguration.input_id]: e.target.value });
                  }}
                  aria-describedby={currentConfiguration.input_id}
                />
                <div className="form-text text-white"><small id={currentConfiguration.input_id}>{currentConfiguration.input_help}</small></div>
              </div>
              }

              {(currentConfiguration.input_type === "radio") &&
                <div className={`form-inline my-3 mx-4 ${moves ? 'form-animation' : ''}`}>
                  <label className="text-white my-3">{currentConfiguration.grand_label}</label>
                  {currentConfiguration.radioLabels.map((radiolabel, index) => (
                    <div key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentConfiguration.input_id}
                        id={`${currentConfiguration.input_id}_${index}`}
                        value={radiolabel}
                        checked={data[currentConfiguration.input_id] === radiolabel}
                        ref={(el) => {
                          // Store refs for each radio button group
                          if (!inputRadioRefs.current[currentConfiguration.input_id]) {
                            inputRadioRefs.current[currentConfiguration.input_id] = [];
                          }
                          inputRadioRefs.current[currentConfiguration.input_id][index] = el;
                        }}
                        onChange={() => {
                          setData({ ...data, [currentConfiguration.input_id]: radiolabel });
                        }}
                      />
                      <label className="mx-3 form-check-label text-white" htmlFor={`${currentConfiguration.input_id}_${index}`}>{radiolabel}</label>
                    </div>
                  ))}
                </div>
              }

              {(currentConfiguration.input_type === "list") &&
                <div className={`form-inline my-3 mx-4 ${moves ? 'form-animation' : ''}`}>
                  <label className="text-white my-3">{currentConfiguration.grand_label}</label>
                  <input
                    className="form-control"
                    list={`${currentConfiguration.input_id}_options`}
                    name={currentConfiguration.input_id}
                    id={currentConfiguration.input_id}
                    placeholder="Type to search"
                    onChange={(e) => {
                      setData({ ...data, [currentConfiguration.input_id]: e.target.value });
                    }}
                  />
                  <datalist id={`${currentConfiguration.input_id}_options`}>
                    {allUnits.map((currentUnitName, index) => (
                      <option key={index} value={currentUnitName.title} />
                    ))}
                  </datalist>
                </div>
              }
              </div>
            <button onClick={action} type="submit" className="btn btn-primary mt-5 mb-3 mx-3">{currentConfiguration.action_button_label}</button>
          </form>
        </div>
      </div>
    );
  };
}
