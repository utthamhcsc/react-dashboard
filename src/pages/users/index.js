import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AdminForm from './UserForm';
import AdminPage from './UsersPage';

export default () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/add`} component={AdminForm} />
      <Route path={`${path}/edit/:id`} component={AdminForm} />
      <Route path={`${path}`} component={AdminPage} />
    </Switch>
  );
};
