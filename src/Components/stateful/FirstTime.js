import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import video from "../../video_and_sound_files/call_of_duty.mp4";

class FirstTime extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      state: "",
      activities_first: [],
      created: false
    };
  }

  saveAll = async () => {
    try {
      await axios.post("/firsttime", this.state);
      alert(
        `Thanks, ${this.state.displayName}! You've just customized your account! Please sign in again.`
      );
      this.props.history.push("/");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  logout = async () => {
    try {
      await axios.post("/logout");
      alert(`You've successfully been logged out!`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
    this.props.history.push("/");
  };

  render() {
    // const example = {
    //   "Video Games": [
    //     "Playstation 4",
    //     "Xbox One",
    //     "Nintendo Switch",
    //     "PC Gaming"
    //   ],
    //   Sports: ["Basketball", "Baseball"],
    //   "TV/Movie Binge-Watching": ["Netflix", "Hulu"],
    //   "Board Games": ["Game Store", "Casual/At Home"]
    // };

    const consoles = [{}, {}, {}, {}, {}];

    return (
      <div className="whole_app" id="first_time">
        <video autoplay="true" muted loop="true" id="myVideo">
          <source src={video} />
        </video>
        <div className="firstTime_create">
          <h1 style={{ fontSize: "40px", color: "black" }}>
            Let's Get Your Account Customized!
          </h1>
          <TextField
            className="create_text"
            variant="standard"
            fullWidth
            margin="dense"
            required
            label="Display Name"
            autoFocus
            onChange={event => {
              this.setState({ displayName: event.target.value });
            }}
          />
          <FormControl>
            <InputLabel>Which video game console do you game on?</InputLabel>
            <Select
              multiple
              fullWidth
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            ></Select>
          </FormControl>
          <div className="login_button_wrap">
            <Button
              variant="standard"
              color="primary"
              size="lg"
              onClick={this.saveAll}
            >
              Let's go!
            </Button>
            <Button
              variant="standard"
              color="primary"
              size="lg"
              onClick={this.logout}
            >
              Log Out
            </Button>
          </div>
        </div>
        <div className="firstTime_info">
          <h1 style={{ fontSize: "38px", color: "black" }}>
            Account Creation: How To
          </h1>
          <h2 id="firstTime_info_headers">Display Name</h2>
          <p id="firstTime_info_content">
            Here is where you will set the name that people will know you by in
            Croozer! You'll search friends by their display name and they'll
            find you as well. This name will be everywhere in the app, so choose
            wisely! Don't worry, you'll still be able to change it later!
          </p>

          <h2 id="firstTime_info_headers">Clan Tag</h2>

          <p id="firstTime_info_content">
            Your clan tag identifies the team you're on. This can be changed
            later. Get your group of friends together to create your clan tag!
            You can use examples that you'd find online on either PSN or Xbox
            live. A lot of people prefer just 4 character clan tags, but that's
            up to you!
          </p>

          <h2 id="firstTime_info_headers">Birth Date</h2>
          <p id="firstTime_info_content">
            so we can calculate your age to help match you up with people around
            your own age!
          </p>
          <h2 id="firstTime_info_headers">Competitive Categories</h2>
          <p id="firstTime_info_content">
            This is the top-level of your competitive options. We ask you to
            select from a list in order to properly match you with others with
            your same interests later. Let's say that you select Video Games.
            You will then be automatically placed in a pool of other Video Game
            lovers.
          </p>
          <h2 id="firstTime_info_headers">Arenas</h2>
          <p id="firstTime_info_content">
            This is the first sub-category of the competitive options. Based on
            what you selected in the previous menu, you're now asked to further
            specify which "arena" you're in. Think of Arenas like stations of
            play. Perhaps you prefer the basketball "arena" over the Playstation
            4 "arena"?
          </p>
          <h2 id="firstTime_info_headers">Actual Activities</h2>
          <p id="firstTime_info_content">
            This is the most specific level of granularity. What activities are
            you best at? What activity will take you to the top? It will be
            displayed on your profile for people to see. Make it known what
            you're good at!
          </p>
          <h2 id="firstTime_info_headers">Active Times</h2>
          <p id="firstTime_info_content">
            This is, again, for matchmaking purposes. We ask that you tell us
            during which times of the day you're active so we can match you
            easier with people depending on your activities you've chosen!
          </p>
          <h2 id="firstTime_info_headers">State of Residence</h2>
          <p id="firstTime_info_content">
            We definitely want to be able to match you with people in your area.
            We will never divulge personal address information.
          </p>
        </div>
      </div>
    );
  }
}

export default FirstTime;
