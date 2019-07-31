import React, { Component } from "react";
import "../App.css";
import axios from "axios";
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
      clanTag: "",
      state: "",
      activities_first: [],
      activities_second: [],
      activities_third: [],
      preferredTimes: [],
      first_toggle: true,
      second_toggle: true,
      created: false,
    };
  }


  saveAll = async () => {
    try {
      await axios.post("/firsttime", this.state);
      alert(`Thanks, ${this.state.displayName}! You've just customized your account!`)
      this.props.history.push("/home");
    } catch (error) {
      alert("Something went wrong!")
    }
  };

  logout = async () => {
    try {
      await axios.post("/logout");
      alert(`You've successfully been logged out!`);
      this.props.history.push("/");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  render() {
    const states = [
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
    ];

    const timesActive = [
      "Early Morning",
      "Morning",
      "Late Morning",
      "Early Afternoon",
      "Afternoon",
      "Late Afternoon",
      "Early Evening",
      "Evening",
      "Late Evening"
    ];

    const topActivities = [
      "Video Games",
      "Sports",
      "TV/Movie Binge-Watching",
      "Board Games"
    ];

    const firstOptions = {
      "Video Games": [
        "Playstation 4",
        "Xbox One",
        "Nintendo Switch",
        "PC Gaming"
      ],
      "Sports": ["Basketball", "Baseball"],
      "TV/Movie Binge-Watching": ["Netflix", "Hulu"],
      "Board Games": ["Game Store", "Casual/At Home"]
    };

    const secondOptions = {
      "Playstation 4": ["Call of Duty - PS4", "Street Fighter 5", "Final Fantasy XV - PS4"],
      "Xbox One": ["Call of Duty - Xbox One", "Apex Legends", "Final Fantasy XV - Xbox Obne"],
      "Nintendo Switch": [
        "Mario Party 10",
        "Super Smash Brothers: Ultimate",
        "Xenoblade Chronicles 2",
        "Pokemon Sword"
      ],
      "PC Gaming": [
        "Call of Duty - PC",
        "Street Fighter 5",
        "Final Fantasy XV - PC",
        "Starcraft 2"
      ],
      "Basketball": [
        "One on One",
        "Two on Two",
        "Three on Three",
        "Four on Four",
        "Five on Five"
      ],
      "Baseball": [
        "Home Run Derby",
        "Friendly Scrimmage",
        "Batting Cages",
        "Playing Catch"
      ],
      "Netflix": ["The Office", "Stranger Things"],
      "Hulu": ["Brooklyn Nine-Nine", "1969 - James Franco Show"],
      "Game Store": ["D&D 5th Edition", "Magic: The Gathering"],
      "Casual/At Home": ["Board Game Placeholder"]
    };

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
            <InputLabel>What's Your Competitive Category?</InputLabel>
            <Select
              multiple
              value={this.state.activities_first}
              onChange={event => {
                this.setState({
                  activities_first: event.target.value,
                  first_toggle: false
                });
              }}
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            >
              {topActivities.map(activity => {
                return <MenuItem value={activity}>{activity}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl disabled={this.state.first_toggle}>
            <InputLabel> What Arena Are You In?</InputLabel>
            <Select
              multiple
              value={this.state.activities_second}
              onChange={event => {
                this.setState({
                  activities_second: event.target.value,
                  second_toggle: false
                });
              }}
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            >
              {this.state.activities_first.map(activity => {
                const selection = firstOptions[activity];
                return selection.map((result) => {
                  return <MenuItem value={result}>{result}</MenuItem>;
                })
              })}
            </Select>
          </FormControl>
          <FormControl disabled={this.state.second_toggle}>
            <InputLabel>Actual Activities of Choice</InputLabel>
            <Select
              multiple
              value={this.state.activities_third}
              onChange={event => {
                this.setState({ activities_third: event.target.value });
              }}
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            >
              {this.state.activities_second.map(activity => {
                const selection = secondOptions[activity];
                return selection.map((result) => {
                  return <MenuItem value={result}>{result}</MenuItem>;
                })
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>What Times Are You Most Active?</InputLabel>
            <Select
              multiple
              value={this.state.preferredTimes}
              onChange={event => {
                this.setState({ preferredTimes: event.target.value });
              }}
              input={<Input id="select-multiple-checkbox" />}
              className="create_text"
            >
              {timesActive.map(times => {
                return <MenuItem value={times}>{times}</MenuItem>;
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
              {states.map(state => {
                return <MenuItem value={state}>{state}</MenuItem>;
              })}
            </Select>
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
          <h1 style={{ fontSize: "30px", color: "grey" }}>
            Account Creation: How To
          </h1>
        </div>
      </div>
    );
  }
}

export default FirstTime;
