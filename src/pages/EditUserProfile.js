import { useState, useEffect, useRef } from 'react'
import { useMutation, gql, useQuery } from '@apollo/client'
import '../assets/UserProfile.css'
import { Loading } from '../components/Loading'
import  countries  from '../data/countries'
import { toast } from 'react-toastify'

const GET_USER = gql`
query users($id: ID) {
  users(id: $id) {
    firstName
    lastName
    phone
    email
    phone
    birthday
    password
    address
    disability
    zip
    city
    country
  }
}
`;

const UPDATE_USER = gql`
mutation updateUserProfile($id: ID!, $firstName: String, $lastName: String, $city: String, $phone: String, $email: String, $birthday: String, $password: String, $address: String, $disability: [String], $zip: Int, $country: String) {
  updateUserProfile(id: $id, firstName: $firstName, lastName: $lastName, city: $city, phone: $phone, email: $email, birthday: $birthday, password: $password, address: $address, disability: $disability, zip: $zip, country: $country) {
    firstName
    lastName
    phone
    email
    birthday
    password
    address
    disability
    zip
    city
    country
  }
}
`;

export const EditUserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const firstName = useRef()
  const lastName = useRef()
  const address = useRef()
  const city = useRef()
  const country = useRef()
  const zip = useRef()
  const email = useRef()
  const password = useRef()
  const birthday = useRef()
  const phone = useRef()
  const disability = useRef()
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {id: user.id},
    errorPolicy: "all",
  });

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues.firstName || inputValues.firstName.length < 3) {
      errors.firstName = "Your first name is too short!";
    }
    if (!inputValues.lastName || inputValues.lastName.length < 3) {
      errors.lastName = "Your last name is too short!";
    }
    if (!inputValues.email || inputValues.email.length < 15) {
      errors.email = "Email is too short!";
    }
    if (!inputValues.password || inputValues.password.length < 5) {
      errors.password = "Password is too short!";
    }
    if (!inputValues.phone || inputValues.phone < 10) {
      errors.phone = "Phone number should be at least 10 characters long.";
    }
    if (!inputValues.birthday) {
      errors.birthday = "Please enter your birthday.";
    }
    if (!inputValues.address || inputValues.address.length < 10) {
      errors.address = "Address should be at least 10 characters long.";
    }
    if (!inputValues.city || inputValues.city.length < 5) {
      errors.city = "City name should have at least 5 characters.";
    }
    if (!inputValues.zip || inputValues.zip < 5) {
      errors.zip = "Zip or postal code should have at least 5 characters.";
    }
    if (!inputValues.country || inputValues.country.length < 5) {
      errors.country = "Name of country should have at least 5 characters.";
    }
    return errors;
  };

  const [updateUser, { newData, newLoading, newError }] = useMutation(UPDATE_USER)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputValues2 = {
      id: user.id,
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      address: address.current.value,
      city: city.current.value,
      country: country.current.value,
      zip: Number(zip.current.value),
      email: email.current.value,
      password: password.current.value,
      birthday: birthday.current.value,
      phone: phone.current.value,
      disability: [disability.current.value]
    }
    try {
      const result = await updateUser({
        variables: inputValues2,
        errorPolicy: "all"
      });
      result.data.updateUserProfile ? toast("Successfully changed profile data.") : toast("Error saving information.") // Log the data returned from the mutation
    } catch (error) {
      console.error('Error adding council:', error.message);
    }
  };
  // useEffect(() => {
  //   toast("Success!")
  // },[result, result.updateUserProfile])

  if (loading || newLoading) {return <Loading />}
  if (data && data.users && data.users.length) {

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
          htmlFor="firstName"
          >
            First name
          </label>
          <input
            type="text"
            ref={firstName}
            name="firstName"
            id="firstName"
            className="form-control"
            defaultValue={data.users[0].firstName}
            // onChange={handleChange}
            style={{ border: errors.firstName ? "1px solid red" : null }}
          />
        </div>
        {errors.firstName ? (
          <p className="error">Your name is too short.</p>
        ) : null}

        <div className="form-outline mb-4">
          <label
          className="form-label"
          htmlFor="lastName"
          >
            Last name
          </label>
          <input
            type="text"
            ref={lastName}
            name="lastName"
            id="lastNAme"
            className="form-control"
            defaultValue={data.users[0].lastName}
            // onChange={handleChange}
            style={{ border: errors.lastName ? "1px solid red" : null }}
          />
        </div>
        {errors.lastName ? (
          <p className="error">Your last name is too short.</p>
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
            ref={email}
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].email}
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
            type="password"
            name="password"
            id="password"
            ref={password}
            className="form-control"
            // defaultValue={data.users[0].password}
            // onChange={handleChange}
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
            name="birthday"
            id="birthday"
            ref={birthday}
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].birthday}
            style={{ border: errors.birthday ? "1px solid red" : null }}
          />
        </div>
        {errors.birthday ? (
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
            ref={phone}
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].phone}
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
            ref={address}
            id="address"
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].address}
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
            ref={city}
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].city}
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
            ref={zip}
            className="form-control"
            // onChange={handleChange}
            defaultValue={data.users[0].zip}
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
            ref={country}
            // onChange={handleChange}
            defaultValue={data.users[0].country}
            placeholder="Type to search..."
            style={{ border: errors.country ? "1px solid red" : null }}
          />
          <datalist id="countryOptions">
            {countries.map((country) => (
              <option key={`${country.code}`} value={`${country.name}`} />
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
          ref={disability}
          // onChange={handleChange}
          placeholder="Type to search..."
          style={{ border: errors.disability ? "1px solid red" : null }}
          />
          <datalist id="disabilityOptions">
            <option value="Psychological" />
            <option value="Hands" />
            <option value="Legs" />
            <option value="Biochemistry" />
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
}
