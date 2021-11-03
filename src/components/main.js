import React from "react";
import Login from "./login/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import DashBoard from "./dashboard/index";
import { AccountProvider } from "../providers/AccountContext";
import Authorize from "./Authorize";

const Main = () => {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/authorize" component={Authorize} />
          <Route exact path="/dashboard" component={DashBoard} />
        </Switch>
      </AccountProvider>
    </BrowserRouter>
  );
};
export default Main;
