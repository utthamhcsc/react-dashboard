import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import PermissionChecker from '../../utils/PermissionChecker';
import AdminForm from './ProductForm';
import AdminPage from './ProductPage';

export default () => {
  const { path } = useRouteMatch();
  const Auth = useAuth();
  const pc = new PermissionChecker(Auth.currentUser);
  const canEdit = pc.match({ allowedRoles: ['admin'] });
  const canDelete = pc.match({ allowedRoles: ['admin'] });
  const canAdd = pc.match({ allowedRoles: ['admin'] });

  return (
    <Switch>
      {canAdd && <Route path={`${path}/add`} component={AdminForm} />}
      {canEdit && <Route path={`${path}/edit/:id`} component={AdminForm} />}
      <Route
        path={`${path}`}
        render={() => (
          <AdminPage canAdd={canAdd} canEdit={canEdit} canDelete={canDelete} />
        )}
      />
    </Switch>
  );
};
