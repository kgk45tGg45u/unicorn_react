import { useState, useRef, useEffect } from 'react';
import '../../assets/wizard.css';

export const UserWizard1 = () => {
  const [moves, setMoves] = useState(false);

  const formConfigurations = [
    {
      grand_label: "Full Name",
      input_id: "fullname",
      input_type: "text",
      input_help: "Your full name will be confirmed with your ID through a confirmation process.",
      action_button_label: "Next",
    },

  ];

  const [currentConfigurationIndex, setCurrentConfigurationIndex] = useState(1);
  const inputData = useRef()
  const [data, setData] = useState({});

  const action = (e) => {
    e.preventDefault();

    // Product name
    if(currentConfigurationIndex === 3){
      setData(prevData => ({
        ...prevData,
        [formConfigurations[currentConfigurationIndex].input_id]: inputData.current.value
      }));
      setCurrentConfigurationIndex(4);
    }

  }

  useEffect(() => {
    console.log("data: ", data);
  }, [data])

  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="wcontainer rounded-3 shadow-lg">
        {/* {(currentConfigurationIndex === 10) &&
          <div>Thank you!</div>
        } */}

        <div className="mt-4 mb-3 mx-4 text-white">
          <h2>Personal Data</h2>
        </div>

        <form className="my-3 mx-4 col-lg-10">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="inputEmail4">Email</label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
            </div>
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="inputPassword4">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <label className="text-white my-3" htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="form-group col-md-4">
              <label className="text-white my-3" htmlFor="inputState">State</label>
              <select id="inputState" className="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="text-white my-3" htmlFor="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip" />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input my-3" type="checkbox" id="gridCheck" />
              <label className="form-check-label text-white my-3" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  );
};
