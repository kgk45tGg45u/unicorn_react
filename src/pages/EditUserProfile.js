import { useFetch } from '../hooks/useFetch'
import { useState, useEffect } from 'react'
import '../assets/UserProfile.css'
import { useNavigate } from 'react-router-dom'
import { Form } from '../components/Form'

export const EditUserProfile = () => {
  const [load, setLoad] = useState(true)
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const id = currentUser.id
  const navigate = useNavigate()
  const { result: user, loading } = useFetch(id, "", "users", "GET"); // Destructure loading from useFetch result

  useEffect(() => {
    setLoad(false)
  }, [loading])

  const buttons = ['Update']

  const handleUserEdit = (e) => {
    e.preventDefault()
    const newData = {
      id: currentUser.id,
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      phone: e.target.elements.phone.value,
      address: e.target.elements.address.value
    }
      console.log(newData)
      navigate("/update", { state: { value: newData } });
    }

  if (load) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  if (!load) {
    const inputs = [
      { name: 'name', type: "text", defaultValue: user.user.name },
      { name: 'email', type: "text", defaultValue: user.user.email },
      { name: 'phone', type: "text", defaultValue: user.user.phone },
      { name: 'password', type: "password" },
      { name: 'address', type: "text", defaultValue: user.user.address}
    ]

    return (
      <div className="container">
        <Form inputs={inputs} buttons={buttons} action={handleUserEdit} />
      </div>
)}
}
