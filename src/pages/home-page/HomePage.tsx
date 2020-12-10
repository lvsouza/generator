import React from 'react';
import { VscGithubAction, VscEdit } from 'react-icons/vsc';
import { useHistory } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const history = useHistory();

  return (
    <div className="padding-xg flex-column">
      <h3>Starting</h3>

      <hr className="hr margin-top-g margin-bottom-m" style={{ backgroundColor: 'var(--color-background-highlighted)' }} />

      <div>
        <button onClick={() => history.push('/criator')} autoFocus className="margin-right-g padding-m text-white border-radius-soft border-default flex-items-center display-flex">
          <VscEdit className="margin-s" size={20} />
          Creator
        </button>
        <button onClick={() => history.push('/generator')} className="padding-m text-white border-radius-soft border-default flex-items-center display-flex">
          <VscGithubAction className="margin-s" size={20} />
          Generator
        </button>
      </div>
    </div>
  );
};
