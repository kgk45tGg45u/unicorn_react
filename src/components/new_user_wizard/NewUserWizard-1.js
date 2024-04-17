import { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import '../../assets/wizard.css';

export const UserWizard1 = () => {
  // const [moves, setMoves] = useState(false);
  const navigate = useNavigate()
  const firstName = useRef()
  const lastName = useRef()
  const address = useRef()
  const city = useRef()
  const country = useRef()
  const zip = useRef()
  const currentUser = JSON.parse(localStorage.getItem("user"))

  const action = async (e) => {
    e.preventDefault();

    const personalData = {
      id: currentUser.id,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      address: address.current.value,
      city: city.current.value,
      country: country.current.value,
      zip: zip.current.value
    }

    try {
      const response = await fetch("http://localhost:3001/users/add-personal-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalData),
      });
      if (response.ok) {
        // If the request is successful, update the local state with the new data
        const res = await response.json();
        if (res.token) {
          localStorage.removeItem("user")
          localStorage.setItem("user", JSON.stringify(res.user))
          toast.info('User Data updated!')
        }
      } else {
        toast.error("Failed to save data to the backend");
      }
    } catch (error) {
      console.error("Error saving data to the backend:", error);
      // Provide feedback to the user about the error in saving data
    } finally {
      navigate('/new-user-wizard-2')
    }



    // record(personalData)

  }

  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="wcontainer1 rounded-3 shadow-lg">
        <div className="mt-4 mb-3 mx-4 text-white">
          <h2>Personal Data</h2>
        </div>

        <form className="my-3 mx-4 col-lg-10">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" ref={firstName} />
            </div>
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="firstName">Last name</label>
              <input type="text" className="form-control" id="lastName" ref={lastName} />
            </div>
          </div>
          <div className="form-group">
            <label className="text-white my-3" htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" ref={address} />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="text-white my-3" htmlFor="city">City</label>
              <input type="text" className="form-control" id="city" ref={city} />
            </div>
            <div className="form-group col-md-4">
              <label className="text-white my-3" htmlFor="country">Country</label>
              <input id="country" className="form-control" ref={country} placeholder="Click to choose" list="countryOptions" />
                <datalist id="countryOptions">
                  <option>Iran</option>
                  <option>United States</option>
                  <option>Germany</option>
                </datalist>
            </div>
            <div className="form-group col-md-2">
              <label className="text-white my-3" htmlFor="zipCode">Zip/Postal code</label>
              <input type="text" className="form-control" id="zipCode" ref={zip} />
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
          <button type="submit" className="btn btn-primary" onClick={action}>Next</button>
        </form>
      </div>
    </div>
  );
};
