import React, { useCallback } from 'react';
import { VscGithubAction, VscEdit, VscHome } from 'react-icons/vsc';
import { useHistory, useLocation, matchPath } from 'react-router-dom';

export const Toolbar: React.FC = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const matchingPath = useCallback((path: string) => {
    const match = matchPath(pathname, {
      path
    });
    return match?.isExact;
  }, [pathname]);

  return (
    <>
      <hr className="hr" />
      <div>

        <button onClick={() => history.push('/home')} className={`padding-horizontal-s text-color${matchingPath('/home') ? '' : ' background-bars'}`}>
          <VscHome size={20} className="margin-s" />
        </button>
        <hr className="hr hr-vertical" />
        <button onClick={() => history.push('/creator/patterns')} className={`padding-horizontal-s text-color${matchingPath('/creator/:step') ? '' : ' background-bars'}`}>
          <VscEdit size={20} className="margin-s" />
        </button>
        <button onClick={() => history.push('/generator')} className={`padding-horizontal-s text-color${matchingPath('/generator') ? '' : ' background-bars'}`}>
          <VscGithubAction size={20} className="margin-s" />
        </button>

        <div className="background-bars flex1" />
      </div>
      <hr className="hr" />
    </>
  );
};
