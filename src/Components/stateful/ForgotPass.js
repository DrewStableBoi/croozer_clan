import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import video from "../../video_and_sound_files/donovan_mitchel.mp4";

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
      alert("Error! You may not already have an account created!");
    }
  };

  render() {
    return (
      <div className="whole_app">
        <video
          autoplay="true"
          muted
          loop="true"
          id="myVideo"

        >
          <source src={video} />
        </video>
        <div className="login_box">
          <h1 style={{ fontSize: "30px" }}>
            {" "}
            Enter Your Information to Reset Your Password
          </h1>
          <TextField
            className="login_text"
            variant="standard"
            margin="dense"
            required
            fullWidth
            label="First Name"
            autoFocus
            onChange={event => {
              this.setState({ first_name: event.target.value });
            }}
          />
          <TextField
            className="login_text"
            variant="standard"
            margin="dense"
            required
            fullWidth
            label="Last Name"
            autoFocus
            onChange={event => {
              this.setState({ last_name: event.target.value });
            }}
          />
          <TextField
            className="login_text"
            variant="standard"
            margin="dense"
            required
            fullWidth
            label="Email"
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
            label="New Password"
            type="password"
            autoFocus
            onChange={event => {
              this.setState({ newPass: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <Button style={{backgroundColor: '#C7152E', color: 'white'}} variant="contained" fullWidth onClick={this.reset}>
              Reset Password
            </Button>
            <Button variant="standard" color="primary">
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Go Back Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPass;
