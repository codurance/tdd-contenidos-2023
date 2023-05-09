import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import {PasswordForm} from "./PasswordForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main>
        <PasswordForm />
    </main>
  </React.StrictMode>
);
