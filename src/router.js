import React, { lazy, Suspense } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getToken } from './utility/helpers/general';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './constants/routerConst';
import Spinner from './components/Spinner';

const AppLayout = lazy(() => import('./containers/App/Layout'));

const publicRoutes = [
  // All public Router like (login,etc) goes here
  // {
  //   path: PUBLIC_ROUTE.LANDING,
  //   exact: true,
  //   component: lazy(() => import('./containers/Pages/Login')),
  // },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('./containers/Pages/404')),
  },
  // {
  //   path: PUBLIC_ROUTE.SIGN_IN,
  //   component: lazy(() => import('./containers/Pages/Login')),
  // },
];
function PrivateRoute({ children, ...rest }) {
  // Every Time isLoggedIn true because of its hard codded
  let isLoggedIn = useSelector(state => state.Auth.idToken);
  const isLoggedOut = useSelector(state => state.Auth.isLoggedOut);

  if (!isLoggedIn) isLoggedIn = getToken().idToken;

  return (
    <Route
      {...rest}
      render={() =>
        isLoggedIn && !isLoggedOut ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: PUBLIC_ROUTE.SIGN_IN,
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Switch>
            {publicRoutes.map(route => (
              <Route key={route.path} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/">
              <AppLayout />
            </PrivateRoute>
            <Route component={lazy(() => import('./containers/Pages/404'))} />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
