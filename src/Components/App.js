import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import Create from "./Create";
import ForgotPassword from "./ForgotPass";
import FirstTime from "./FirstTime";
import 'typeface-roboto';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Login} exact path="/" />
          <Route component={Create} path="/signup" />
          <Route component={Home} path="/home" />
          <Route component={FirstTime} exact path="/firsttime"/>
          <Route component={ForgotPassword} path="/forgot" />
        </Switch>
      </Router>
      </div>
    );
  }
} 

export default App;
