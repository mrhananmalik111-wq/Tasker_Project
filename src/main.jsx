import { StrictMode } from 'react';
import React from 'react';
import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "react-toastify/dist/ReactToastify.css";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
