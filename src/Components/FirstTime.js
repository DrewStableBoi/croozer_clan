import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

class FirstTime extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      birthday: "",
      age: "",
      clanTag: "",
      state: "",
      activities: [],
      preferredTimes: [],
      created: false,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Minor Outlying Islands",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "U.S. Virgin Islands",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],
      timesActive: [
        "Early Morning",
        "Morning",
        "Late Morning",
        "Early Afternoon",
        "Afternoon",
        "Late Afternoon",
        "Early Evening",
        "Evening",
        "Late Evening"
      ],
      topActivities: [
        "Video Games",
        "Sports",
        "TV/Movie Binge-Watching",
        "Board Games"
      ]
    };
  }

  saveAll = () => {};

  logout = async () => {
    try {
      await axios.get("/logout");
      this.setState({ loggedIn: false });
      alert(`You've successfully been logged out!`);
      this.props.history.push("/");
    } catch (error) {
      alert(
        "Something went wrong!"
      );
    }
  };

  render() {
    return (
      <div className="whole_app" id="first_time">
        <div className="firstTime_create">
          <h1 style={{ fontSize: "40px", color: "grey" }}>
            Hey there, idiot! Let's set up your profile!
          </h1>
          <TextField
            className="create_text"
            variant="standard"
            margin="dense"
            required
            label="Display Name"
            autoFocus
            onChange={event => {
              this.setState({ displayName: event.target.value });
            }}
          />
          <TextField
            className="create_text"
            label="Birthday"
            type="date"
            required
            InputLabelProps={{
              shrink: true
            }}
            onChange={event => {
              this.setState({ birthday: event.target.value });
            }}
          />
          <TextField
            className="create_text"
            variant="standard"
            margin="dense"
            label="Clan Tag"
            autoFocus
            onChange={event => {
              this.setState({ clanTag: event.target.value });
            }}
          />

          <FormControl>
            <InputLabel>What Are Your Activities of Choice?</InputLabel>
            <Select
              multiple
              value={this.state.activities}
              onChange={event => {
                this.setState({ activities: event.target.value });
              }}
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            >
              {this.state.topActivities.map(activity => {
                return <MenuItem value={activity}>{activity}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>State of Residence</InputLabel>
            <Select
              onChange={event => {
                this.setState({ state: event.target.value });
              }}
              className="create_text"
              value={this.state.state}
            >
              {this.state.states.map(state => {
                return <MenuItem value={state}>{state}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div className="login_button_wrap">
          <Button variant="standard" color="primary" onClick={this.saveAll}>
            Create Account
          </Button>
          <Button variant="standard" color="primary" onClick={this.logout}>
            Log Out
          </Button>
          </div>
        </div>
        <div className="firstTime_info">
          <h1 style={{ fontSize: "30px", color: "grey" }}>
            Account Creation: How To
          </h1>
        </div>
      </div>
    );
  }
}

export default FirstTime;
