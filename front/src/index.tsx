import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Providers from './Providers';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Providers>
      <App/>
    </Providers>
  </BrowserRouter>
);
