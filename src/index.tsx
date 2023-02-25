import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
document.querySelector('body').classList.add('font-Lato', 'h-max');
root.render(
  <App />
);
