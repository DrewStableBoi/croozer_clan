import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      login: false
    };
  }

  signIn = async () => {
    try {
      const body = {
        email: this.state.email,
        password: this.state.password
      };
      let user = await axios.post("/login", body).then(res => {
        return res.data;
      });

      this.setState({ login: true });
      alert(`Welcome back, ${this.state.email}!`);
      this.props.handleSetUser(user);
      this.props.history.push("/home");

    } catch (error) {
      alert(
        "Something went wrong. Either the account doesn't exist or you entered in the credentials the wrong way. Try again!"
      );
    }
  };

  render() {
    return (
      <div className="whole_app">
        <div className="login_box">
          <h1>Croozer Sign In</h1>
          <TextField
            className="login_text"
            variant="standard"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <TextField
            className="login_text"
            variant="standard"
            margin="dense"
            required
            fullWidth
            id="standard-password-input"
            type="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <Button variant="standard" color="primary" onClick={this.signIn}>
              Sign In
            </Button>
            <Button variant="standard" color="primary">
              <Link to="/forgot">Forgot Password?</Link>
            </Button>
            <Button variant="standard" color="primary" id="login_button">
              <Link to="/signup">Create New Account</Link>
            </Button>
          </div>
          <h2
            style={{
              fontSize: "15px",
              color: "grey",
              fontFamily: '"Times New Roman", Times, serif'
            }}
          >
            Created by Drew Hemsley, 2019
          </h2>
        </div>
      </div>
    );
  }
}

export default Login;
