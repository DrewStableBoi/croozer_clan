import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from 'react-router-dom';

class ForgotPass extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      newPass: ""
    };
  }

  reset = async () => {
    try {
      const body = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        newPass: this.state.newPass
      };
      if (
        body.first_name === "" ||
        body.last_name === "" ||
        body.email === "" ||
        body.password === ""
      ) {
        return alert("Please enter valid credentials");
      }
      await axios.put("/resetpass", body);
      alert(`Your password has successfully been changed!`);
      this.props.history.push("/");
    } catch (error) {
      alert("Error, please try again");
    }
  };

  render() {
    return (
      <div className="whole_app">
        <div className="login_box">
          <h1 style={{ fontSize: "30px" }}>
            {" "}
            Enter Your Information to Reset Your Password
          </h1>
          <input
            className="login_text"
            placeholder="First Name"
            onChange={event => {
              this.setState({ first_name: event.target.value });
            }}
          />
          <input
            className="login_text"
            placeholder="Last Name"
            onChange={event => {
              this.setState({ last_name: event.target.value });
            }}
          />
          <input
            className="login_text"
            placeholder="Email"
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <input
            className="login_text"
            placeholder="New Password"
            type="password"
            onChange={event => {
              this.setState({ newPass: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <button className="login_button" onClick={this.reset}>
              Reset Password
            </button>

            <button className="login_button">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Go Back Home
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
