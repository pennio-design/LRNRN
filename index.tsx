import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// STRATEGIC: Use React 18 createRoot for concurrent features support.
// Error boundary and global providers will be added in App.tsx.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);