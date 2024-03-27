import { useState, useEffect } from 'react'
import '../assets/UserProfile.css'
import { Loading } from '../components/Loading'
import  countries  from '../data/countries'

export const EditUserProfile = () => {
const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    phone: null,
    address: "",
    disability: "",
    zip: null,
    city: "",
    country: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.name.length < 12) {
      errors.name = "Your name is too short!";
    }
    if (inputValues.email.length < 15) {
      errors.email = "Email is too short!";
    }
    if (inputValues.password.length < 5) {
      errors.password = "Password is too short!";
    }
    if (!inputValues.phone || inputValues.phone < 10) {
      errors.phone = "Phone number should be at least 10 characters long.";
    }
    if (!inputValues.birthday) {
      errors.birthday = "Please enter your birthday.";
    }
    if (inputValues.address.length < 10) {
      errors.address = "Address should be at least 10 characters long.";
    }
    if (!inputValues.disability) {
      errors.disability = "Please enter your disability criteria.";
    }
    if (inputValues.city.length < 5) {
      errors.city = "City name should have at least 5 characters.";
    }
    if (!inputValues.zip || inputValues.zip < 5) {
      errors.zip = "Zip or postal code should have at least 5 characters.";
    }
    if (inputValues.country.length < 5) {
      errors.country = "Name of country should have at least 5 characters.";
    }
    return errors;
  };

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues(inputFields));
    setSubmitting(true);
  };

  const finishSubmit = () => {
    console.log(inputFields);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors]);

  return (
    <div className="container">
    <div className="edit_user">
      {Object.keys(errors).length === 0 && submitting ? (
        <span className="success">Successfully submitted ✓</span>
      ) : null}
      <form onSubmit={handleSubmit}>


        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.name ? "1px solid red" : null }}
          />
        </div>
        {errors.name ? (
          <p className="error">Your name is too short.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.email ? "1px solid red" : null }}
          />
        </div>
        {errors.email ? (
          <p className="error">Email should be at least 15 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="password"
          >
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.password ? "1px solid red" : null }}
          />
        </div>
        {errors.password ? (
          <p className="error">Password should be at least 5 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="birthday"
          >
            Birthday
          </label>
          <input
            type="text"
            name="Birthday"
            id="Birthday"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.Birthday ? "1px solid red" : null }}
          />
        </div>
        {errors.Birthday ? (
          <p className="error">The format for your birthday is wrong.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="phone"
          >
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.phone ? "1px solid red" : null }}
          />
        </div>
        {errors.phone ? (
          <p className="error">Phone number should be at least 10 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.address ? "1px solid red" : null }}
          />
        </div>
        {errors.address ? (
          <p className="error">Address should be at least 10 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="city"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.city ? "1px solid red" : null }}
          />
        </div>
        {errors.city ? (
          <p className="error">City should be at least 5 characters long.</p>
        ) : null}

      <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="zip"
          >
            Postal / ZIP code
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            className="form-control"
            onChange={handleChange}
            style={{ border: errors.zip ? "1px solid red" : null }}
          />
        </div>
        {errors.zip ? (
          <p className="error">Zip or Postal code should be at least 5 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
            className="form-label"
            htmlFor="country"
            >
              Country
          </label>
          <input
            className="form-control"
            list="countryOptions"
            id="country"
            name="country"
            onChange={handleChange}
            placeholder="Type to search..."
            style={{ border: errors.country ? "1px solid red" : null }}
          />
          <datalist id="countryOptions">
            {countries.map((country) => (
              <option value={`${country.name}`} />
            ))}
          </datalist>
        </div>
        {errors.country ? (
          <p className="error">Name of country should be at least 5 characters long.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="disability"
          >
            Disability
          </label>
          <input
          className="form-control"
          list="disabilityOptions"
          id="disability"
          name="disability"
          onChange={handleChange}
          placeholder="Type to search..."
          style={{ border: errors.disability ? "1px solid red" : null }}
          />
          <datalist id="disabilityOptions">
            <option value="None" />
            <option value="New York" />
            <option value="Seattle" />
            <option value="Los Angeles" />
            <option value="Chicago" />
          </datalist>
        </div>
        {errors.disability ? (
          <p className="error">Please choose a disability</p>
        ) : null}

      <button className="mt-4 btn btn-primary" type="submit">Save information</button>
    </form>
  </div>
  </div>
)}
