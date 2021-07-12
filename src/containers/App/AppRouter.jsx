import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout';

import { PRIVATE_ROUTE } from '../../constants/routerConst';
import Spinner from '../../components/Spinner';

const routes = [
  {
    path: PRIVATE_ROUTE.MAIN,
    component: lazy(() => import('../Pages/Dashboard')),
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.DASHBOARD,
    component: lazy(() => import('../Pages/Dashboard')),
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.CAMPAIGN,
    component: lazy(() => import('../Pages/Campaign')),
    exact: true,
  },
];

const Routers = () => (
  // const { url } = useRouteMatch();
  <Router>
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          {routes.map(route => (
            <Route exact={route.exact} key={route.path} path={`/${route.path}`}>
              <route.component />
            </Route>
          ))}
          <Route component={lazy(() => import('../Pages/404'))} />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
);
export default Routers;
