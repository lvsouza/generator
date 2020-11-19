import React from 'react';

import { ModalControls } from '../frame-controls/ModalControls';
import { useWindowControls } from '../../hooks';
import './WindowFrame.css';

export const WindowFrame: React.FC = ({ children }) => {
  const { isMaximized, isFocused, toggleMaximize, close, minimize } = useWindowControls();

  return (
    <main className={`flex1 display-flex flex-column ${isFocused ? 'border-default' : 'border-default-transparent'}`}>
      <div className="frame-base background-bars">
        <div className="flex1 draggable-area flex-items-center">
          <label className="padding-horizontal-s">Generator</label>
        </div>
        <ModalControls
          toggleMaximize={toggleMaximize}
          isMaximized={isMaximized}
          minimize={minimize}
          close={close}
        />
      </div>
      <div className="flex1 flex-column">
        {children}
      </div>
    </main>
  );
};
