// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Import global CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// 2. Import your main App component
import App from './App';

// 3. Render the App component into the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);