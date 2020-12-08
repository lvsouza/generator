import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

export const Toolbar: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <hr className="hr" />
      <div className="background-bars">
        <button onClick={() => history.push('/')} className="display-flex flex-items-center padding-horizontal-s background-transparent border-none text-color">
          <VscHome size={20} className="margin-s" />
        </button>
      </div>
    </>
  );
};
