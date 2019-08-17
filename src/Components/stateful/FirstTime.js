import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import video from "../../video_and_sound_files/call_of_duty.mp4"


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
      created: false
    };
  }

  saveAll = async () => {
    try {
      await axios.post("/firsttime", this.state);
      alert(
        `Thanks, ${
          this.state.displayName
        }! You've just customized your account!`
      );
      this.props.history.push("/home");
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
      "Playstation 4": [
        "Call of Duty - PS4",
        "Street Fighter 5",
        "Final Fantasy XV - PS4"
      ],
      "Xbox One": [
        "Call of Duty - Xbox One",
        "Apex Legends",
        "Final Fantasy XV - Xbox Obne"
      ],
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
          <h1 style={{ fontSize: "40px", color: "black" }}>
            Let's Get Your Account Customized!
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
                return selection.map(result => {
                  return <MenuItem value={result}>{result}</MenuItem>;
                });
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
                return selection.map(result => {
                  return <MenuItem value={result}>{result}</MenuItem>;
                });
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
          <h1 style={{ fontSize: "30px", color: "black" }}>
            Account Creation: How To
          </h1>
          <h2 id="firstTime_info_headers">Display Name</h2>
          <p id="firstTime_info_content">
            Here is where you will set the name that people will know you by
            in Croozer! You'll search friends by their display name and
            they'll find you as well. This name will be everywhere in the
            app, so choose wisely! Don't worry, you'll still be able to
            change it later!
          </p>

          <h2 id="firstTime_info_headers">Clan Tag</h2>

          <p id="firstTime_info_content">
            Your clan tag identifies the team you're on. This can be changed
            later. Get your group of friends together to create your clan
            tag! You can use examples that you'd find online on either PSN
            or Xbox live. A lot of people prefer just 4 character clan tags,
            but that's up to you!
          </p>

          <h2 id="firstTime_info_headers">Birth Date</h2>
          <p id="firstTime_info_content">
            Pretty self-explanitory. We ask for your birthday so we can
            calculate your age to help match you up with people around your
            own age!
          </p>
          <h2 id="firstTime_info_headers">Competitive Categories</h2>
          <p id="firstTime_info_content">
            This is the top-level of your competitive options. We ask you to
            select from a h2st in order to properly match you with others
            with your same interests later. Let's say that you select Video
            Games. You will then be automatically placed in a pool of other
            Video Game lovers.
          </p>
          <h2 id="firstTime_info_headers">Arenas</h2>
          <p id="firstTime_info_content">
            This is the first sub-category of the competitive options. Based
            on what you selected in the previous menu, you're now asked to
            further specify which "arena" you're in. Think of Arenas like
            stations of play. Perhaps you prefer the basketball "arena" over
            the Playstation 4 "arena"?
          </p>
          <h2 id="firstTime_info_headers">Actual Activities</h2>
          <p id="firstTime_info_content">
            This is the most specific level of granularity. What activities
            are you best at? What activity will take you to the top? It will
            be displayed on your profile for people to see. Make it known
            what you're good at!
          </p>
          <h2 id="firstTime_info_headers">Active Times</h2>
          <p id="firstTime_info_content">
            This is, again, for matchmaking purposes. We ask that you tell
            us during which times of the day you're active so we can match
            you easier with people depending on your activities you've
            chosen!
          </p>
          <h2 id="firstTime_info_headers">State of Residence</h2>
          <p id="firstTime_info_content">
            We definitely want to be able to match you with people in your
            area. We will never divulge personal address information.
          </p>
        </div>
      </div>
    );
  }
}

export default FirstTime;
