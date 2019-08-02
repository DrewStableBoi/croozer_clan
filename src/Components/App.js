import React, { Component } from "react";
import Login from "./Login";
import Home from "./Home";
import Create from "./Create";
import ForgotPassword from "./ForgotPass";
import axios from "axios";
import FirstTime from "./FirstTime";
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

            <Route component={Home} path="/home" />

            {/* <Route
              render={props => {
                const { user } = this.state;
                if (user.display_name) {
                  return <Home user={this.state.user} {...props} />;
                } else {
                  return <Redirect to="/firsttime" />;
                }
              }}
              path="/home"
            /> */}

            <Route component={FirstTime} path="/firsttime" />

            {/* <Route
              render={props => {
                const { user } = this.state;
                if (!user.display_name && user.email) {
                  return <FirstTime user={this.state.user} {...props} />;
                } else {
                  return <Redirect to="/" />;
                }
              }}
              exact
              path="/firsttime"
            /> */}

            {/* Commenting out the above Route strategies because I'm working on the component */}

            <Route
              render={props => {
                return <ForgotPassword {...props} user={this.state.user} />;
              }}
              exact
              path="/forgot"
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
