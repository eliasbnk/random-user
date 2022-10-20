import React from 'react';
import ReactDOM from 'react-dom/client';
import UserContextProvider from 'contexts/users-context';
import App from 'App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
