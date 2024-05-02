import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql, useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import '../../assets/wizard.css';
import { Loading } from '../Loading';
import { formConfigurations } from './NewUserFormConfigurations';
const unitClient = new ApolloClient({
  uri: 'http://localhost:3001/unit/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});
const councilClient = new ApolloClient({
  uri: 'http://localhost:3001/council/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});
const productAndServiceClient = new ApolloClient({
  uri: 'http://localhost:3001/productAndService/graphql', // Endpoint for unit schema
  cache: new InMemoryCache(),
});

const GET_ALL_UNITS = gql`
  query GetAllUnits {
    GetAllUnits {
      name
      id
    }
  }
`;

const UPDATE_USER_WORKING = gql`
mutation updateUserProfile($id: ID!, $working: Boolean!) {
  updateUserProfile(id: $id, working: $working) {
    id
    working
  }
}
`;

const ADD_UNIT = gql`
mutation addUnit($user_id: ID!, $name: String!) {
  addUnit(user_id: $user_id, name: $name) {
    id
    name
  }
}
`;

const EDIT_UNIT = gql`
mutation editUnit($user_id: ID!, $name: String!) {
  editUnit(user_id: $user_id, name: $name) {
    id
    name
  }
}
`;

const ADD_SERVICE_PRODUCT = gql`
mutation addServiceProduct($user_id: ID!, $hasProduct: Boolean, $hasService: Boolean) {
  addServiceProduct(user_id: $user_id, hasProduct: $hasProduct, hasService: $hasService) {
    id
    name
  }
}
`;

const ADD_COUNCIL = gql`
mutation addCouncil($user_id: ID!, $name: String!, $unit_id: Int!) {
  addCouncil(user_id: $user_id, name: $name, unit_id: $unit_id) {
    id
    name
  }
}
`;

const ADD_PRODUCT_SERVICE = gql`
mutation addProductAndService($name: String!, $unit_id: Int!, $service: Boolean!, $active: Boolean!) {
  addProductAndService(name: $name, unit_id: $unit_id, service: $service, active: $active) {
    id
    name
  }
}
`;

export const UserWizard2 = () => {
  const [moves, setMoves] = useState(false);
  const navigate = useNavigate()
  const { loading: allUnitsLoading, error: allUnitsError, data: allUnits } = useQuery(GET_ALL_UNITS, {
    client: unitClient, // Use the unitClient
    errorPolicy: "all",
  });
  const [updateUser, { newData, newLoading, newError }] = useMutation(UPDATE_USER_WORKING)
  const [addUnit, { unitData, unitLoading, unitError }] = useMutation(ADD_UNIT)
  const [editUnit, { editUnitData, editUnitLoading, editUnitError }] = useMutation(EDIT_UNIT)
  const [addServiceProductToUnit, { addServiceProductToUnitData, addServiceProductToUnitLoading, addServiceProductToUnitError }] = useMutation(ADD_SERVICE_PRODUCT)
  const [addCouncil, { newCouncilData, newCouncilLoading, newCouncilError }] = useMutation(ADD_COUNCIL)
  const [addProductAndService, { newProductData, newProductLoading, newProductError }] = useMutation(ADD_PRODUCT_SERVICE)
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
        const result = await updateUser({
          variables: {id: requestBody.id, working: requestBody.workingYesNo === "No" ? false : true},
          errorPolicy: "all"
        });
        result.data.updateUserProfile ? toast.success("Successfully changed profile data.") : toast.error("Error saving information.") // Log the data returned from the mutation
        tryExecuted = true
      } catch (error) {
        console.error('Error working details', error.message);
      }
    }

    if (tryExecuted) {
      // Logic to record all other information
      if (data.newProductionUnitName) {
        try {
          console.log("Running the second function.")
          const result = await addUnit({
            variables: {user_id: requestBody.id, name: requestBody.newProductionUnitName},
            client: unitClient,
            errorPolicy: "all"
          });
          if (result.data.addUnit.name) {
            toast.success("Successfully created new working unit.")
            localStorage.setItem("unitId", JSON.stringify(result.data.addUnit.id))
            tryExecuted = true
          } else {
            toast.error("Error creating new unit.") // Log the data returned from the mutation
          }
        } catch (error) {
          console.error('Error adding a new unit.', error.message);
        }
      } else if (data.currentProductionUnit) {
        try {
          console.log("Running the third function.")
          const result = await editUnit({
            variables: {user_id: requestBody.id, name: requestBody.currentProductionUnit},
            client: unitClient,
            errorPolicy: "all"
          });
          if (result.data.editUnit.name) {
            toast.success("Successfully edited the production unit.")
            localStorage.setItem("unitId", JSON.stringify(result.data.editUnit.id))
            tryExecuted = true
          } else {
            toast.error("Error changing production unit.") // Log the data returned from the mutation
          }
        } catch (error) {
          console.error('Error editing unit.', error.message);
        }
      }
    }

    if (tryExecuted){
      if (data.producingYesNo || data.hasService) {
        try {
          console.log("Running the fourth function.")
          let hasProductBoolean
          let hasServiceBoolean
          if (data.producingYesNo && data.producingYesNo === "Yes") {let hasProductBoolean = true}
          if (data.producingYesNo && data.producingYesNo === "No") {let hasProductBoolean = false}
          if (data.hasService && data.hasService === "Yes") {let hasServiceBoolean = true}
          if (data.hasService && data.hasService === "No") {let hasServiceBoolean = false}
          const result = await addServiceProductToUnit({
            variables: {user_id: requestBody.id, hasService: hasServiceBoolean, hasProduct: hasProductBoolean},
            client: unitClient,
            errorPolicy: "all"
          });
          if (result.data.addServiceProduct.name) {
            toast.success("Successfully edited the production unit.")
            tryExecuted = true
          } else {
            toast.error("Error changing production unit.") // Log the data returned from the mutation
          }
        } catch (error) {
          console.error('Error editing unit.', error.message);
        }
      }
    }

    if (tryExecuted && data.councilName) {
      try {
        console.log("Running the fifth function.")
        const unit_id = Number(localStorage.getItem("unitId"))
        const result = await addCouncil({
          variables: {user_id: requestBody.id, name: requestBody.councilName, unit_id: unit_id},
          client: councilClient,
          errorPolicy: "all"
        });
        if (result.data.addCouncil.name) {
          toast.success("Successfully registered a new council.")
          tryExecuted = true
        } else {
          toast.error("Error adding new council.") // Log the data returned from the mutation
        }
      } catch (error) {
        console.error('Error adding new council.', error.message);
      }
    }

    if (tryExecuted) {
      if (data.product1title) {
        try {
          console.log("Running the sixth function.")
          const unit_id = Number(localStorage.getItem("unitId"))
          const result = await addProductAndService({
            variables: {name: requestBody.product1title, unit_id: unit_id, service: false, active: false},
            client: productAndServiceClient,
            errorPolicy: "all"
          });
          if (result.data.addProductAndService.name) {
            toast.success("Successfully added a new product.")
            tryExecuted = true
          } else {
            toast.error("Error adding a new product.") // Log the data returned from the mutation
          }
        } catch (error) {
          console.error('Error adding a new product.', error.message);
        }
      }
      if (data.hasService) {
        try {
          console.log("Running the seventh function.")
          const unit_id = Number(localStorage.getItem("unitId"))
          const result = await addProductAndService({
            variables: {name: requestBody.serviceName, unit_id: unit_id, service: true, active: false},
            client: productAndServiceClient,
            errorPolicy: "all"
          });
          if (result.data.addProductAndService.name) {
            toast.success("Successfully added a new service.")
            tryExecuted = true
          } else {
            toast.error("Error adding a new service.") // Log the data returned from the mutation
          }
        } catch (error) {
          console.error('Error adding a new service.', error.message);
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

  if(allUnitsLoading) {
    return(<Loading />)
  }

  if(allUnitsError) {
    toast.error("Error getting units names.")
  }

  if(allUnits.GetAllUnits) {
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
                    {allUnits.GetAllUnits.map((unit) => (
                      <option key={unit.id} value={unit.name} />
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
