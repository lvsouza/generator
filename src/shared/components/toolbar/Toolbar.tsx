import React from 'react';
import { VscGithubAction, VscEdit, VscHome } from 'react-icons/vsc';
import { useHistory, useLocation } from 'react-router-dom';

export const Toolbar: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <>
      <hr className="hr" />
      <div className="background-bars">
        <button onClick={() => history.push('/home')} className={`padding-horizontal-s text-color${pathname === '/home' ? ' background' : ''}`}>
          <VscHome size={20} className="margin-s" />
        </button>
        <hr className="hr hr-vertical" />
        <button onClick={() => history.push('/generator')} className={`padding-horizontal-s text-color${pathname === '/generator' ? ' background' : ''}`}>
          <VscGithubAction size={20} className="margin-s" />
        </button>
        <button onClick={() => history.push('/criator')} className={`padding-horizontal-s text-color${pathname === '/criator' ? ' background' : ''}`}>
          <VscEdit size={20} className="margin-s" />
        </button>
      </div>
      <hr className="hr" />
    </>
  );
};
