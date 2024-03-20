import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserWizardProvider } from './hooks/UserWizardProvider'
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <UserWizardProvider>
        <App />
      </UserWizardProvider>
    </BrowserRouter>
);
