import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Windmill } from '@windmill/react-ui'

import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <UserProvider>
  <Windmill dark="true">
    <App />
    </Windmill>
  </UserProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
