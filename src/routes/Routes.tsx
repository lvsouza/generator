import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { HomePage } from './../pages';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/home'} exact component={HomePage} />

        <Route path={'*'} exact component={() => <Redirect to="/home" />} />
      </Switch>
    </BrowserRouter>
  );
};
