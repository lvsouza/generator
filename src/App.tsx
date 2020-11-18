import React from 'react';
import { render } from 'react-dom';

import { WindowFrame } from './core';
import './shared/styles/global.css';

const App = () => {
  return <>
    <WindowFrame/>
  </>;
};

render(<App />, document.getElementById('root'));
