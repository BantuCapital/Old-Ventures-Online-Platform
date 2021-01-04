import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./form/Login";
import loadingPage from "./form/loadingPage";
import CompanyDetails from "./form/CompanyDetails";
import SignUp from "./form/SignUp";
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/loading"} component={loadingPage} />
          <Route exact path={"/"} component={CompanyDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
