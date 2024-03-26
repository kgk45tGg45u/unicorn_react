import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserWizardProvider } from './hooks/UserWizardProvider'
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledEngineProvider } from '@mui/styled-engine';

import { BrowserRouter } from 'react-router-dom'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <StyledEngineProvider injectFirst>
      <UserWizardProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={1400}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
        <App />
      </UserWizardProvider>
      </StyledEngineProvider>
    </BrowserRouter>
);
