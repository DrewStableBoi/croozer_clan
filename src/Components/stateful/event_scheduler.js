import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from 'moment';

class EventSchedule extends Component {
  constructor() {
    super();

    this.state = {
      mainUser: {},
      selectedFriendId: "",
      userEvents: [],
      userFriends: [],
      eventName: "",
      eventDay: "",
      eventDescription: "",
      categories: [],
      arenas: [],
      activities: [],
      first_toggle: true,
      second_toggle: true
    };
  }

  componentDidMount() {
    const id = this.props.user.id;
    axios.get("/getEvents", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userEvents: response.data
      });
    });
    axios.get("/getUserFriends", { params: { id } }).then(response => {
      this.setState({
        userFriends: response.data
      });
    });
    this.setState({
      mainUser: this.props.user
    });
  }

  refreshEvents = () => {
    const id = this.props.user.id;
    axios.get("/getEvents", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userEvents: response.data
      });
    });
  };

  cancelEvent = close => {
    this.setState({
      selectedFriendId: "",
      eventName: "",
      eventDay: "",
      eventTime: "",
      eventActivity: ""
    });
    close();
  };

  scheduleEvent = async (close) => {
    const eventObject = {
      challenger_id: this.state.mainUser.id,
      accepter_id: this.state.selectedFriendId,
      event_description: this.state.eventDescription,
      day_of_event: this.state.eventDay,
      event_category: this.state.categories,
      event_arena: this.state.arenas,
      event_activity: this.state.activities
    };
    try {
      await axios.post("/scheduleEvent", eventObject);
      alert(
        `Thanks, ${
          this.props.user.display_name
        }! You've just scheduled your event. Your friend will see it!`
      );
      this.refreshEvents();
      close();
      this.props.history.push("/home");
    } catch (error) {
      alert("Something went wrong!");
    }

  };

  deleteEvent = async (id, close) => {
    try {
      await axios.delete(`/event/${id}`);
      this.refreshEvents();
      alert("Event Deleted!");
      this.props.history.push("/home");
      close();
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  refreshEvents = () => {
    const id = this.props.user.id;
    axios.get("/getEvents", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userEvents: response.data
      });
    });
  }; 

  setOutcomeWin = async (id, close) => {
    try {
      await axios.post(`/eventWin/${id}`);
      this.refreshEvents();
      alert("Congratulations on the win!");
      this.deleteEvent(id);
      close();
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  setOutcomeLoss = async (id, close) => {
    try {
      await axios.post(`/eventLoss/${id}`);
      this.refreshEvents();
      alert("Welp, you suck! Don't lose next time!");
      this.deleteEvent(id);
      close();
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  render() {
    const categories = [
      "Video Games",
      "Sports",
      "TV/Movie Binge-Watching",
      "Board Games"
    ];

    const arenas = {
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

    const activities = {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#76828c"
        }}
      >
        <div className="messageTitle">
          <h1
            style={{
              display: "flex",
              padding: "10px",
              fontSize: "35px",
              textDecorationLine: "underline",
              color: "white"
            }}
          >
            Event Scheduler!
          </h1>
          <div
            className="searchButton_container"
            style={{
              display: "flex",
              padding: "10px"
            }}
          >
            <Popup
              trigger={<Button color="default">Schedule Event</Button>}
              position="right center"
              modal
            >
              {close => (
                <div
                  className="messageContainer"
                  style={{ height: "500px", justifyContent: "space-around" }}
                >
                  <h1
                    style={{
                      fontSize: "25px",
                      textDecorationLine: "underline"
                    }}
                  >
                    Schedule an Event with a Friend!{" "}
                  </h1>
                  <div className="eventContainer">
                    <div className="eventSearch">
                      <h2 style={{ color: "grey", fontSize: "25px" }}>
                        Select Friend Here
                      </h2>
                      <FormControl style={{ width: "70%", textAlign: "left" }}>
                        <InputLabel>Friend List</InputLabel>
                        <Select
                          value={this.state.selectedFriendId}
                          onChange={event => {
                            this.setState({
                              selectedFriendId: event.target.value
                            });
                          }}
                        >
                          {this.state.userFriends.map(friend => {
                            return (
                              <MenuItem value={friend.friend_id}>
                                {friend.friend_display}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="eventCreateAndDescribe">
                      <div className="eventCreate" style={{ width: "70%" }}>
                        <h2 style={{ color: "grey", fontSize: "20px" }}>
                          Create Event Here - Try Something New!
                        </h2>
                        <div className="eventCreateSelectors">
                          <FormControl
                            style={{ width: "70%", textAlign: "left" }}
                          >
                            <InputLabel>Competitive Categories?</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={this.state.categories}
                              onChange={event => {
                                this.setState({
                                  categories: event.target.value,
                                  first_toggle: false
                                });
                              }}
                              input={<Input id="select-multiple-checkbox" />}
                              className="create_text"
                            >
                              {categories.map(activity => {
                                return (
                                  <MenuItem value={activity}>
                                    {activity}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                          <FormControl
                            disabled={this.state.first_toggle}
                            style={{ width: "70%", textAlign: "left" }}
                          >
                            <InputLabel> Arenas?</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={this.state.arenas}
                              onChange={event => {
                                this.setState({
                                  arenas: event.target.value,
                                  second_toggle: false
                                });
                              }}
                              input={<Input id="select-multiple-checkbox" />}
                              className="create_text"
                            >
                              {this.state.categories.map(category => {
                                const selection = arenas[category];
                                return selection.map(result => {
                                  return (
                                    <MenuItem value={result}>{result}</MenuItem>
                                  );
                                });
                              })}
                            </Select>
                          </FormControl>
                          <FormControl
                            disabled={this.state.second_toggle}
                            style={{ width: "70%", textAlign: "left" }}
                          >
                            <InputLabel>Activities?</InputLabel>
                            <Select
                              multiple
                              fullWidth
                              value={this.state.activities}
                              onChange={event => {
                                this.setState({
                                  activities: event.target.value
                                });
                              }}
                              input={<Input id="select-multiple-checkbox" />}
                              className="create_text"
                            >
                              {this.state.arenas.map(arena => {
                                const selection = activities[arena];
                                return selection.map(result => {
                                  return (
                                    <MenuItem value={result}>{result}</MenuItem>
                                  );
                                });
                              })}
                            </Select>
                          </FormControl>
                          <TextField
                            className="create_text"
                            label="Date of Event"
                            style={{ width: "70%", textAlign: "left" }}
                            type="date"
                            required
                            InputLabelProps={{
                              shrink: true
                            }}
                            onChange={event => {
                              this.setState({ eventDay: event.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="eventCreate">
                        <h2 style={{ color: "grey", fontSize: "20px" }}>
                          Write a Short Event Description
                        </h2>{" "}
                        <textarea
                          style={{
                            height: "60%",
                            width: "100%",
                            fontSize: "15px"
                          }}
                          name="text"
                          wrap="soft"
                          required
                          value={this.state.eventDescription}
                          onChange={event => {
                            this.setState({
                              eventDescription: event.target.value
                            });
                          }}
                        >
                          {" "}
                        </textarea>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="messageButtons">
                    <Button size="small" color="default" onClick={() =>
                                this.scheduleEvent(close)
                              }>
                      Schedule Event
                    </Button>
                    <Button
                      size="small"
                      color="default"
                      onClick={() => {
                        this.cancelEvent(close);
                      }}
                    >
                      Cancel Event
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        {this.state.userEvents.length === 0 ? (
          <h1 style={{ fontSize: "18px" }}>
            No events scheduled yet. Go ahead and schedule one now!
          </h1>
        ) : (
          this.state.userEvents.map(index => {
            return (
              <div>
                <div className="messageCentral_container">
                  <div className="messageCentral_subject">
                    {index.event_activity}
                  </div>
                  <div className="messageCentral_body">
                    {index.event_description}
                  </div>
                  <h1
                    style={{
                      fontSize: "18px",
                      display: "flex",
                      color: "white"
                    }}
                  >
                    Set by:
                  </h1>
                  <div className="messageCentral_from">
                    <div className="messageCentral_fromNames">
                      <h2 style={{ display: "flex", paddingRight: "5px" }}>
                        {index.challenger_full_name}, {index.accepter_full_name}
                      </h2>
                    </div>
                    <div className="messageCentral_from_time">
                      <h1
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          color: "white",
                          paddingRight: "5px"
                        }}
                      >
                        Event Time:
                      </h1>
                      <h2>
                        {moment(index.day_of_event).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="messageCentral_buttons">
                    <Popup
                      trigger={<button>Mark Outcome</button>}
                      position="right center"
                    >
                      {close => (
                        <div>
                        What was the outcome? 
                        <button
                          onClick={() =>
                            this.setOutcomeWin(index.event_id, close)
                          }
                        >
                          Win
                        </button>
                        <button onClick={() =>
                            this.setOutcomeLoss(index.event_id, close)
                          }>Loss</button>
                      </div>
                    )}
                    </Popup>
                    <Popup
                      trigger={<button>Delete Event</button>}
                      position="right center"
                    >
                      {close => (
                        <div>
                          Are you sure you want to?
                          <button
                            onClick={() =>
                              this.deleteEvent(index.event_id, close)
                            }
                          >
                            Yes
                          </button>
                          <button>No</button>
                        </div>
                      )}
                    </Popup>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default EventSchedule;
