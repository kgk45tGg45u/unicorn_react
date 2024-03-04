import { Header } from './components/Header.js'
import { Login } from './components/Login.js'
import { Register } from './components/Register.js'
import {useState, useEffect} from 'react';
import { AuthProvider } from './hooks/AuthProvider.js'


function App() {
  const [users, setUsers] = useState(false);

  function getUser() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setUsers(data);
      });
  }

  function createUser() {
    let name = prompt('Enter user name');
    let email = prompt('Enter user email');
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  function deleteUser() {
    let id = prompt('Enter user id');
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  function updateUser() {
    let id = prompt('Enter user id');
    let name = prompt('Enter new user name');
    let email = prompt('Enter new user email');
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <section>
      <AuthProvider>
        <Header />
        <Login />
        <Register />
      </AuthProvider>
    </section>
  );
}
export default App;
