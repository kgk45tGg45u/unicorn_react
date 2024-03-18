import { useState, useRef, useEffect } from 'react';
import '../assets/wizard.css';

export const UserWizard = () => {
  const formConfigurations = [
    {
      grand_label: "Full Name",
      input_id: "fullname",
      input_type: "text",
      input_help: "Your full name will be confirmed with your ID through a confirmation process.",
      action_button_label: "Next",
    },
    {
      grand_label: "Do you currently provide a product or offer a service to public?",
      input_id: "workingYesNo",
      input_type: "radio",
      input_help: "",
      radioLabels: ["Yes", "No"],
      action_button_label: "Next",
    },
    {
      grand_label: "Do you currently produce a product?",
      input_id: "producingYesNo",
      input_type: "radio",
      input_help: "",
      radioLabels: ["Yes", "No"],
      action_button_label: "Next",
    },
    {
      grand_label: "Complete name or title of your main product",
      input_id: "product1title",
      input_type: "text",
      input_help: "Please enter the name of your main product. You can add or remove products later.",
      action_button_label: "Next",
    },
    {
      grand_label: "Do you currently provide a service to the public?",
      input_id: "hasService",
      input_type: "radio",
      input_help: "",
      radioLabels: ["Yes", "No"],
      action_button_label: "Next",
    },
    {
      grand_label: "Complete name or title of the service you offer",
      input_id: "serviceName",
      input_type: "text",
      input_help: "",
      action_button_label: "Next",
    },
    {
      grand_label: "Do you work alone or with others?",
      input_id: "hasUnit",
      input_type: "radio",
      input_help: "",
      radioLabels: ["I work in a team", "I work alone"],
      action_button_label: "Next",
    },
    {
      grand_label: "Enter the name of your production unit",
      input_id: "currentProductionUnit",
      input_type: "text",
      input_help: "",
      action_button_label: "Next",
    },
    {
      grand_label: "Set or decide a name for your production unit",
      input_id: "newProductionUnitName",
      input_type: "text",
      input_help: "",
      action_button_label: "Next",
    },
    {
      grand_label: "Set a name for your working council",
      input_id: "producingYesNo",
      input_type: "text",
      input_help: "A working council is responsible for the economy of the production unit. You can change this name later.",
      action_button_label: "Go to Services/Products",
    },
    // Add more form configurations as needed
  ];

  const [currentConfigurationIndex, setCurrentConfigurationIndex] = useState(0);
  const inputData = useRef()
  const inputRadio = useRef()
  const [data, setData] = useState({});

  const action = (e) => {
    e.preventDefault();
    console.log(currentConfigurationIndex)
    if(currentConfigurationIndex === 0){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(1);
    }

    if(currentConfigurationIndex === 1 && data.workingYesNo === "No"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      setCurrentConfigurationIndex(500);
    }

    if(currentConfigurationIndex === 1 && data.workingYesNo === "Yes"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(2);
    }

    if(currentConfigurationIndex === 2 && data.producingYesNo === "Yes"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(3);
    }

    if(currentConfigurationIndex === 2 && data.producingYesNo === "No"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(4);
    }

    // Product name
    if(currentConfigurationIndex === 3){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(4);
    }

    // Offering service?
    if(currentConfigurationIndex === 4 && data.hasService === "No"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(6);
    }

    // Offering service?
    if(currentConfigurationIndex === 4 && data.hasService === "Yes"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(5);
    }

    // Service name
    if(currentConfigurationIndex === 5){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(6);
    }

    // Has unit?
    if(currentConfigurationIndex === 6 && data.hasUnit === "Yes"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(7);
    }

    // Name of unit
    if(currentConfigurationIndex === 6 && data.hasUnit === "No"){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(8);
    }

    // Unit name if has
    if(currentConfigurationIndex === 7){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(9);
    }

    // Unit name if has
    if(currentConfigurationIndex === 9){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputRadio.current.value
      }));
      // handle advancing to the next form configuration:
      setCurrentConfigurationIndex(500);
    }

    if(currentConfigurationIndex === 500){
      console.log("The end")
    }
  }

  useEffect(() => {
    console.log("data: ", data);
  }, [data])

  const currentConfiguration = formConfigurations[currentConfigurationIndex];

  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        <div className="mt-4 mb-3 mx-4 text-white">
          <h2>Personal Data</h2>
        </div>

        <form className="form-inline my-3 mx-4">
          <div className="form-group mx-sm-3 mb-2 font-weight-bold">
            {(currentConfiguration.input_type === "text") ?
            <div>
              <label htmlFor={currentConfiguration.input_id} className="text-white my-3">{currentConfiguration.grand_label}</label>
              <input type={currentConfiguration.input_type} name={currentConfiguration.input_id} className="form-control" id={currentConfiguration.input_id} ref={inputData} aria-describedby={currentConfiguration.input_id}/>
              <div className="form-text text-white"><small id={currentConfiguration.input_id}>{currentConfiguration.input_help}</small></div>
            </div>
            : ""}

            {(currentConfiguration.input_type === "radio") ?
              <label className="text-white my-3">{currentConfiguration.grand_label}</label> : ""}
              {(currentConfiguration.input_type === "radio") && currentConfiguration.radioLabels.map((radiolabel, index) => (
                <div key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={currentConfiguration.input_id}
                    id={`${currentConfiguration.input_id}_${index}`}
                    value={radiolabel}
                    ref={inputRadio}
                    onChange={() => setData({ ...data, [currentConfiguration.input_id]: radiolabel })}
                  />
                  <label className="mx-3 form-check-label text-white" htmlFor={`${currentConfiguration.input_id}_${index}`}>{radiolabel}</label>
                </div>
              ))}

          </div>
          <button onClick={action} type="submit" className="btn btn-primary mt-5 mb-3 mx-3">{currentConfiguration.action_button_label}</button>
        </form>
      </div>
    </div>
  );
};
