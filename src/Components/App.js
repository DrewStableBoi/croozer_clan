import React, { Component } from "react";
import Login from "./stateful/Login";
import Home from "./stateful/Home";
import Create from "./stateful/Create";
import ForgotPassword from "./stateful/ForgotPass";
import axios from "axios";
import FirstTime from "./stateful/FirstTime";
import materialLogin from "../Components/materialLogin";
import "typeface-roboto";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    axios.get("/user").then(response => {
      console.log(response);
      this.setState({
        user: response.data
      });
    });
  }

  handleSetUser = user => {
    this.setState({
      user
    });
  };

  render() {
    console.log("this is app js", this.state);
    return (
      <div>
        <Router>
          <Switch>
            <Route
              render={props => {
                return (
                  <Login
                    {...props}
                    user={this.state.user}
                    handleSetUser={this.handleSetUser}
                  />
                );
              }}
              exact
              path="/"
            />

            <Route component={Create} path="/signup" />
            <Route component={FirstTime} path="/firsttime" />
            <Route component={FirstTime} path="/changeAccount" />
            <Route component={ForgotPassword} path = "/forgot" /> 
            <Route component={materialLogin} path="/logintest" />


            <Route
              render={props => {
                const { user } = this.state;
                // if (user.display_name) {
                  return (
                    <Home 
                      {...props}
                      user={this.state.user}
                      handleSetUser={this.handleSetUser}
                    />
                  );
                // } else {
                //   return <Redirect to="/firsttime" />;
                // }
              }}
              path="/home"
            />

            {/* <Route
              render={props => {
                const { user } = this.state;
                if (!user.display_name && user.email) {
                  return (
                    <FirstTime
                      {...props}
                      user={this.state.user}
                      handleSetUser={this.handleSetUser}
                    />
                  );
                } else {
                  return <Redirect to="/" />;
                }
              }}
              exact
              path="/firsttime"
            /> */}

            {/* <Route
              render={props => {
                return (
                  <ForgotPassword
                    {...props}
                    user={this.state.user}
                    handleSetUser={this.handleSetUser}
                  />
                );
              }}
              exact
              path="/forgot"
            /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
