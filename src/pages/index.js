import React, { lazy, Suspense, useEffect } from 'react';
import { Routes } from '../constants/Routes';
import { Switch, Route } from 'react-router-dom';
import { AuthenticationProvider } from '../contexts/AuthContext';
const LoginPage = lazy(() => import('./login'));
const RegisterPage = lazy(() => import('./registration'));
const AdminPage = lazy(() => import('./dashboard'));
function RouteComponent() {
  useEffect(() => {}, []);
  return (
    <AuthenticationProvider>
      <Suspense fallback={<div>Loading....</div>}>
        <Switch>
          <Route exact path={[Routes.LOGIN, '/']} component={LoginPage} />
          <Route exact path={Routes.REGISTER} component={RegisterPage} />
          <Route path={Routes.ADMIN} component={AdminPage} />
        </Switch>
      </Suspense>
    </AuthenticationProvider>
  );
}

export default RouteComponent;
