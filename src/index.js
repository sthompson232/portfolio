import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import { render } from 'react-snapshot';

render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();