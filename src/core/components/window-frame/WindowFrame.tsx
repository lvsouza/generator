import React from 'react';

import './WindowFrame.css';

export const WindowFrame: React.FC = ({ children }) => {
  return (
    <main className="flex1 display-flex flex-column">
      <div className="draggable-area frame-base flex-items-center background-bars">
        <label className="flex1 padding-horizontal-s">Title</label>
        <button>teste</button>
      </div>
      <div className="flex1 flex-column">
        {children}
      </div>
    </main>
  );
};
