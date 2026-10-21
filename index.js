import { createRoot } from 'react-dom/client';
import { StrictMode, createElement } from 'react';
import App from './src/App.jsx';
import { DarkModeContextProvider } from './src/coontext/darkModeContext.jsx';

createRoot(document.getElementById('root')).render(
  createElement(StrictMode, null,
    createElement(DarkModeContextProvider, null,
      createElement(App)
    )
  )
);
