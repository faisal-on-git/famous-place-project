import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
<Router>
 
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Router>
</AuthContextProvider>
);


