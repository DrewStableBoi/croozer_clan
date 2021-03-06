import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import video from "../../video_and_sound_files/street_fighter.mp4";

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
      alert("Account created successfully! Please sign in again!");
      this.props.history.push("app/firsttime");
    } catch (error) {
      alert("Error, please try again");
    }
  };

  render() {
    return (
      <div className="whole_app">
        <video autoplay="true" muted loop="true" id="myVideo">
          <source src={video} />
        </video>
        <div className="login_box">
          <h1 style={{ fontSize: "40px" }}>Create Your Account</h1>
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
            label="Password"
            type="password"
            autoFocus
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className="login_button_wrap">
              <Button style={{backgroundColor: '#C7152E', color: 'white'}} variant="contained" color="primary" fullWidth onClick={this.create}>
                Create Account
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

export default Create;
