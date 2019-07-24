import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class ForgotPass extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
    };
  }

  find = async () => {
    try {
      const body = {
        email: this.state.email
      };
      const foundUser = await axios.post("http://localhost:8080/users/all", body);
      alert(`Your password is ${foundUser.data.password}`);
      this.props.history.push("/");
    } catch (error) {
        alert("Error, please try again");
    }
  };

  render() {
    return (
      <div className="whole_app">
        <div className="login_box">
          <h1>Enter Your Email to Retrieve Your Password</h1>
          <input
            className="login_text"
            placeholder="Email"
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <button className="login_button" onClick={this.find}>Retrieve Password</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
