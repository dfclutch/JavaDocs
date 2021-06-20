import React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import DefinedError from './views/DefinedError';

/*
  Routing architecture shamelessly taken from Ryan Yost:
  https://www.ryanjyost.com/react-routing/
*/

const ROUTES = [
  { path: '/', key: 'HOME', exact: true, component: Home},
  { path: '/error', key: 'DEFINED_ERROR', component: DefinedError},
  { path: '/login', key: 'login', exact: true, component: Login},
  { path: '/register', key: 'register', exact: true, component: Register},
  {
    path: '/app',
    key: 'APP',
    component: props => {
      if (!localStorage.getItem("token")) {
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      { path: '/app', key: "APP", exact: true, component: () => <h1>Ya logged in, bro!</h1>}
    ]
  }
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes}/>}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export default ROUTES;