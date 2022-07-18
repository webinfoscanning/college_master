import React from "react";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
const PrivateRoute = loadable(() => import('./privateroutes'))
const Register = loadable(() => import('./pages/Register'))
const Page404 = loadable(() => import("./pages/Page404"))
const Loginpage = loadable(() => import("./pages/login"))
const DashboardLayout= loadable(() => import("./layouts/dashboard"))
export default function Router() {
  var authenticated = false;
  if (localStorage.getItem("token")) {
    authenticated = true;
  } else {
    authenticated = false;
  }
  return (
    <Switch>
      <Route path="/" exact component={Loginpage} />
      <Route path="/login" exact component={Loginpage} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute
        authenticated={authenticated}
        path="/dashboard"
        Component={DashboardLayout}
      />
      <Route component={Page404} />
    </Switch>
  );
}
