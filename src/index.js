// File: index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// For React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you're using React 17 or earlier, use this instead:
/* 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/