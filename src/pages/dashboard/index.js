import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import Dashboard from '../../components/layout/dashboard';
import Product from '../products';
import PageContent from '../../components/layout/dashboard/PageContent';
import { menus } from '../menus';
import { useAuth } from '../../contexts/AuthContext';
export default function index() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const Auth = useAuth();
  useEffect(() => {
    if (!Auth.currentUser?.isAuthenticated) {
      history.push('/');
    }
  }, []);
  return (
    <Dashboard menus={menus}>
      <Route path={`${path}/`} component={Product} />
    </Dashboard>
  );
}
