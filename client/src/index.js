import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from './ClientContainer/Admin/ToastErrorPage/ErrorContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
    <BrowserRouter >
      <App />
    </BrowserRouter>
    </ErrorProvider>
  </React.StrictMode>
);
