import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation, gql } from '@apollo/client'; // Import useMutation hook from Apollo Client

const AuthContext = createContext();

const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      firstName
      lastName
      email
    }
  }
}
`;

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  // Use useMutation hook to execute GraphQL mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [registerMutation] = useMutation(REGISTER_MUTATION);

  const loginAction = async (data) => {
    try {
      const { data: { login } } = await loginMutation({ variables: { email: data.email, password: data.password } });
      // Check if the register mutation response contains token and user
      if (login.token && login.user) {
        // Extract token and user from the response
        const { token, user } = login;
        // Update user state and save token to local storage
        setUser(user);
        setToken(token);
        localStorage.setItem("site", token);
        localStorage.setItem("user", JSON.stringify(user));
        // Display success toast and navigate to login page
        toast('Login Successful!');
        navigate("/dashboard");
      } else {
        // Handle case where token or user is missing in the response
        toast('Login failed.');
      }
    } catch (err) {
      // Handle registration error
      toast.error("Error", err);
      console.error('Error during login:', err);
    }
  };

  const registerAction = async (data) => {
    try {
      const { data: { register } } = await registerMutation({ variables: { email: data.email, password: data.password } });
      // Check if the register mutation response contains token and user
      if (register.token && register.user) {
        // Extract token and user from the response
        const { token, user } = register;
        // Update user state and save token to local storage
        setUser(user);
        setToken(token);
        localStorage.setItem("site", token);
        localStorage.setItem("user", JSON.stringify(user));
        // Display success toast and navigate to login page
        toast('Registration Successful!');
        navigate("/login");
      } else {
        // Handle case where token or user is missing in the response
        toast('Registration failed.');
      }
    } catch (err) {
      // Handle registration error
      toast.error("Registration error:", err);
      console.error('Error during registration:', err);
    }
  };

  const logOut = () => {
    toast('Logout Successful!');
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
