import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { GeneratorPage, CriatorPage, HomePage } from './../pages';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={'/home'} exact component={HomePage} />

      <Route path={'/generator'} exact component={GeneratorPage} />
      <Route path={'/criator'} exact component={CriatorPage} />

      <Route path={'*'} exact component={() => <Redirect to="/generator" />} />
    </Switch>
  );
};
