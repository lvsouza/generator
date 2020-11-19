import React from 'react';
import { render } from 'react-dom';

import { WindowFrame } from './core';
import './shared/styles/global.css';
import { Routes } from './routes';

const App = () => {
  return (
    <WindowFrame>
      <Routes />
    </WindowFrame>
  );
};

render(<App />, document.getElementById('root'));
