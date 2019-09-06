import React, { Component } from "react";
import Login from "./stateful/Login";
import Home from "./stateful/Home";
import Create from "./stateful/Create";
import ForgotPassword from "./stateful/ForgotPass";
import axios from "axios";
import FirstTime from "./stateful/FirstTime";
import "typeface-roboto";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class AuthenticatedRoutes extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    axios
      .get("/user")
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(err => this.props.history.push("/"));
  }

  render() {
    if (!this.state.user) return <div>sup fools</div>;
    return (
      <div>
        <Route
          path="/app/home"
          render={props => {
            const { user } = this.state;
            if (user.display_name) {
              return (
                <Home
                  {...props}
                  user={this.state.user}
                  handleSetUser={this.handleSetUser}
                />
              );
            } else {
              return <Redirect to="/app/firsttime" />;
            }
          }}
          exact
        />
        )} />
        <Route
          path="/app/changeAccount"
          render={props => (
            <FirstTime
              {...props}
              user={this.state.user}
              handleSetUser={this.handleSetUser}
            />
          )}
        />
        <Route
          path="/app/firsttime"
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
        />
      </div>
    );
  }
}

class App extends Component {
  state = {
    user: null
  };

  handleSetUser = user => {
    this.setState({
      user
    });
  };

  render() {
    return (
      <div>
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

          <Route
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
          />
          <Route path="/app" component={AuthenticatedRoutes} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
