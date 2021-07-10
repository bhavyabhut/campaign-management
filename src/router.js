import React, { lazy, Suspense } from 'react';
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getToken } from './utility/helpers/general';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './constants/routerConst';
import Spinner from './components/Spinner';

const App = lazy(() => import('./containers/App/AppRouter'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('./containers/Pages/Login')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('./containers/Pages/404')),
  },

  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('./containers/Pages/Login')),
  },
];
function PrivateRoute({ children, ...rest }) {
  let isLoggedIn = useSelector(state => state.Auth.isLoggedIn);
  const isLoggedOut = useSelector(state => state.Auth.isLoggedOut);

  if (!isLoggedIn) isLoggedIn = getToken().idToken;
  isLoggedIn = true;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn && !isLoggedOut ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: PUBLIC_ROUTE.SIGN_IN,
              state: { from: location },
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
            <PrivateRoute path="/admin">
              <App />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
