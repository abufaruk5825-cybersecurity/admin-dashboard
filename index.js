import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './src/coontext/darkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DarkModeContextProvider>
  </React.StrictMode>
  document.getElementById('root')
);