import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Toolbar } from './shared/components';
import { WindowFrame } from './core';
import './shared/styles/global.css';
import { Routes } from './routes';

const App = () => {
  return (
    <WindowFrame>
      <BrowserRouter>
        <Toolbar />
        <Routes />
      </BrowserRouter>
    </WindowFrame>
  );
};

render(<App />, document.getElementById('root'));
