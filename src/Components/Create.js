import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      created: false
    };
  }

  create = async () => {
    try {
      const body = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      };
      if (
        body.first_name === "" ||
        body.last_name === "" ||
        body.email === "" ||
        body.password === ""
      ) {
        return alert("Please enter valid credentials");
      }
      await axios.post("/signup", body);
      this.setState({ created: true });
      alert("Account created successfully!");
      this.props.history.push("/firsttime");
    } catch (error) {
      alert("Error, please try again");
    }
  };

  render() {
    return (
      <div className="whole_app">
        <div className="login_box">
          <h1>Create Your Account</h1>
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
            placeholder="Password"
            type="password"
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <div className="login_button">
              <button className="login_button" onClick={this.create}>
                Create Account
              </button>
              <button className="login_button">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Go Back Home
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
