import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import video from "../../video_and_sound_files/croozer_rap.mp4";
import loginSong from "../../video_and_sound_files/A1H.wav";

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

    var audio = new Audio(loginSong);

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
          <h1>Croozer Sign In</h1>
          <TextField
            className="login_text"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email"
            value={this.state.email}
            autoComplete="email"
            autoFocus
            onChange={event => {
              this.setState({ email: event.target.value });
            }}
          />
          <TextField
            className="login_text"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="standard-password-input"
            type="password"
            label="Password"
            value={this.state.password}
            autoComplete="password"
            autoFocus
            onChange={event => {
              this.setState({ password: event.target.value });
            }}
          />
          <div className="login_button_wrap">
            <Button color="default" onClick={this.signIn}>
              Sign In
            </Button>
            <Button color="default">
              <Link style={{ color: "black" }} to="/forgot">
                Forgot Password?
              </Link>
            </Button>
            <Button color="default" id="login_button">
              <Link style={{ color: "black" }} to="/signup">
                Create New Account
              </Link>
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
