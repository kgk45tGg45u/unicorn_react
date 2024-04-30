import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { StyledEngineProvider } from '@mui/styled-engine';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Apollo Client for User Schema
const userClient = new ApolloClient({
  uri: 'http://localhost:3001/user/graphql', // Endpoint for user schema
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApolloProvider client={userClient}>
      <StyledEngineProvider injectFirst>
        <ToastContainer
          position="bottom-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <App />
      </StyledEngineProvider>
    </ApolloProvider>
  </BrowserRouter>
);
