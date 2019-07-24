import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
      await axios.post("/login", body);
      this.setState({ login: true });
      alert(`Welcome back, ${this.state.email}!`);
      this.props.history.push("/home");
    } catch (error) {
      alert(
        "Something went wrong. Either the account doesn't exist or you entered in the credentials the wrong way. Try again!"
      );
    }
  };

  forgotPassword;

  render() {
    return (
      <div className="whole_app">
        <div className="header">Header Placeholder</div>
        <div className="login_box">
          <h1>CRZR</h1>
          <input
            className="login_text"
            placeholder="Email"
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <input
            className="login_text"
            placeholder="Password"
            type="password"
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <button className="login_button" onClick={this.signIn}>
              Sign in
            </button>
            <button className="login_button">
              <Link
                to="/forgot"
                style={{ textDecoration: "none", color: "black" }}
              >
                Forgot Password?
              </Link>
            </button>
            <button className="login_button">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                Create Account
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
