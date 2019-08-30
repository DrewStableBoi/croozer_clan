import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import video from "../../video_and_sound_files/croozer_rap.mp4";
import loginSong from "../../video_and_sound_files/A1H.wav";
import logo from "../../video_and_sound_files/Croozer logo.svg";

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
      const audio = new Audio(loginSong);
      let user = await axios.post("/login", body).then(res => {
        return res.data;
      });

      this.setState({ login: true });
      audio.play();
      alert(`Welcome back, ${this.state.email}!`); 
      this.props.handleSetUser(user);
      this.props.history.push("/app/home");
    } catch (error) {
      alert(
        "Something went wrong. Either the account doesn't exist or you entered in the credentials the wrong way. Try again!"
      );
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
          <img src={logo} width='325px' alt=""></img>
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
            <div style={{width: '100%'}}>
            <Button style={{backgroundColor: '#C7152E', color: 'white'}} variant="contained" fullWidth onClick={this.signIn}>
              Sign In
            </Button>
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <Button color="default" style={{display: 'flex'}}>
              <Link style={{ color: "black" }} to="/forgot">
                Forgot Password?
              </Link>
            </Button>
            <Button color="default" style={{display: 'flex'}}>
              <Link style={{ color: "black" }} to="/signup">
                Create New Account
              </Link>
            </Button>
            </div>
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
