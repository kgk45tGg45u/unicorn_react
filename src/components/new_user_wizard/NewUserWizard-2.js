import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserWizard } from '../../hooks/UserWizardProvider'
import '../../assets/wizard.css';

export const UserWizard2 = () => {
  const [moves, setMoves] = useState(false);
  const { record } = useUserWizard()
  const navigate = useNavigate()

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
      input_id: "councilName",
      input_type: "text",
      input_help: "A working council is responsible for the economy of the production unit. You can change this name later.",
      action_button_label: "Go to Services/Products",
    },
    {
      grand_label: "THANK YOU!",
      input_id: "THANK YOU",
      input_type: "text",
      input_help: "",
      action_button_label: "Go to Services/Products",
    },
    // Add more form configurations as needed
  ];

  const [currentConfigurationIndex, setCurrentConfigurationIndex] = useState(1);
  const inputData = useRef()
  const inputRadioRefs = useRef({});
  const [data, setData] = useState({});

  const action = (e) => {
    e.preventDefault();
    setMoves(true)
    if(currentConfigurationIndex === 1 && data.workingYesNo === "No"){
      console.log("The end")
      // The end logic
      record(data)
      navigate('/new-user-wizard-3')
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
      record(data)
      navigate('/new-user-wizard-3')
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
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      setCurrentConfigurationIndex(9);
    }

    if(currentConfigurationIndex === 8){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
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
      record(data)
      navigate('/new-user-wizard-3')
    }

    if(currentConfigurationIndex === 10){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      console.log("the end")
      record(data)
      navigate('/new-user-wizard-3')
    }
  }

  useEffect(() => {
    console.log("data: ", data);
  }, [data])

  const currentConfiguration = formConfigurations[currentConfigurationIndex];

  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="wcontainer2 rounded-3 shadow-lg">
        {(currentConfigurationIndex === 10) &&
          <div>Thank you!</div>
        }

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
          </div>
          <button onClick={action} type="submit" className="btn btn-primary mt-5 mb-3 mx-3">{currentConfiguration.action_button_label}</button>
        </form>
      </div>
    </div>
  );
};
