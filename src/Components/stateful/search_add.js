import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";


class SearchAdd extends Component {
  constructor() {
    super();

    this.state = {
      mainUser: {},
      type: "",
      name: "",
      searchTarget: "",
      newLoaderDisable: true,
      returnedUsers: [],
      categoryChecked: false,
      arenaChecked: false,
      activityChecked: false,
      searched: false,
      categoryDisabled: false,
      arenaDisabled: false,
      activityDisabled: false,
      messageSubject: "",
      userMessage: ""
    };
  }

  resetState = () => {
    this.setState({
      type: "",
      name: "",
      searchTarget: "",
      returnedUsers: [],
      categoryChecked: false,
      arenaChecked: false,
      activityChecked: false,
      searched: false,
      categoryDisabled: false,
      arenaDisabled: false,
      activityDisabled: false,
      messageSubject: "",
      userMessage: ""
    });
  };

  componentDidMount() {
    this.startUp();
  }

  startUp = () => {
    this.setState({
      mainUser: this.props.user
    });
  };

  searchUsers = () => {
    const item = this.state.searchTarget;
    const userId = this.state.mainUser.id;
    if (!item) {
      return alert("Please enter the search parameters and try again!");
    } else {
      axios
        .get("/search", { params: { item, userId } })
        .then(users => {
          this.setState({ returnedUsers: users.data, searched: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  addFriend = async (id, email, display, close) => {
    const addFriendBody = {
      user_id: this.props.user.id,
      friend_id: id,
      user_email: this.props.user.email,
      friend_email: email,
      user_display: this.props.user.display_name,
      friend_display: display
    };
    axios
      .post("/addFriend", addFriendBody)
      .then(result => {
        alert("Your request has been sent, but they must approve it first!");
        this.resetState();
        close();
      })
      .catch(err => {
        alert("Oops! Something went wrong!");
        console.log(err);
      });
    this.props.history.push("/app/home");
  };

  sendMessage = async (id, close) => {
    const messageObject = {
      messageSubject: this.state.messageSubject,
      userMessage: this.state.userMessage,
      recipientId: id,
      senderId: this.props.user.id
    };
    try {
      await axios.post("/sendMessage", messageObject);
      alert(
        `Thanks, ${this.props.user.display_name}! You've just sent your message. They'll get back to you, soon!`
      );
      close();
      this.resetState();
      this.props.history.push("/app/home");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  clearMessage = () => {
    this.setState({
      userMessage: "",
      messageSubject: ""
    });
  };

  render() {
    const categories = [
      "Video Games",
      "Sports",
      "TV/Movie Binge-Watching",
      "Board Games"
    ];

    const arenas = [
      "Playstation 4",
      "Xbox One",
      "Nintendo Switch",
      "PC Gaming",
      "Basketball",
      "Baseball",
      "Netflix",
      "Hulu",
      "Game Store",
      "Casual/At Home"
    ];

    const activities = [
      "Call of Duty - PS4",
      "Street Fighter 5",
      "Final Fantasy XV - PS4",
      "Call of Duty - Xbox One",
      "Apex Legends",
      "Final Fantasy XV - Xbox Obne",
      "Mario Party 10",
      "Super Smash Brothers: Ultimate",
      "Xenoblade Chronicles 2",
      "Pokemon Sword",
      "Call of Duty - PC",
      "Street Fighter 5",
      "Final Fantasy XV - PC",
      "Starcraft 2",
      "One on One",
      "Two on Two",
      "Three on Three",
      "Four on Four",
      "Five on Five",
      "Home Run Derby",
      "Friendly Scrimmage",
      "Batting Cages",
      "Playing Catch",
      "The Office",
      "Stranger Things",
      "Brooklyn Nine-Nine",
      "1969 - James Franco Show",
      "D&D 5th Edition",
      "Magic: The Gathering",
      "Board Game Placeholder"
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center"
        }}
      >
        <div className="search_container">
          <h1
            style={{
              fontSize: "35px",
              textDecorationLine: "underline",
              color: "white"
            }}
          >
            Search Users for a Challenge!
          </h1>

          <div className="checkbox_container">
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.categoryChecked}
                  disabled={this.state.categoryDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_first",
                      categoryChecked: !this.state.categoryChecked,
                      newLoaderDisable: false,
                      arenaDisabled: true,
                      activityDisabled: true
                    });
                  }}
                />
              }
              label="by Category"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.arenaChecked}
                  disabled={this.state.arenaDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_second",
                      arenaChecked: !this.state.arenaChecked,
                      newLoaderDisable: false,
                      categoryDisabled: true,
                      activityDisabled: true
                    });
                  }}
                />
              }
              label="by Arena"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.activityChecked}
                  disabled={this.state.activityDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_third",
                      activityChecked: !this.state.activityChecked,
                      newLoaderDisable: false,
                      categoryDisabled: true,
                      arenaDisabled: true
                    });
                  }}
                />
              }
              label="by Activity"
            />
            <div style={{display: 'flex'}}>
              <FormControl disabled={this.state.newLoaderDisable} >
                <InputLabel>Select Only One Item</InputLabel>
                <Select
                  required
                  fullWidth
                  margin="dense"
                  value={this.state.searchTarget}
                  onChange={event => {
                    this.setState({ searchTarget: event.target.value });
                  }}
                  input={<Input id="select-multiple-checkbox" />}
                  className="create_text"
                >
                  {this.state.categoryChecked
                    ? categories.map(category => {
                        return <MenuItem value={category}>{category}</MenuItem>;
                      })
                    : this.state.arenaChecked
                    ? arenas.map(arena => {
                        return <MenuItem value={arena}>{arena}</MenuItem>;
                      })
                    : activities.map(activity => {
                        return <MenuItem value={activity}>{activity}</MenuItem>;
                      })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="searchButton_container">
            <Button
              color="default"
              onClick={this.searchUsers}
              style={{ color: "white" }}
            >
              Search
            </Button>
            <Button
              color="default"
              onClick={this.resetState}
              style={{ color: "white" }}
            >
              Clear Search
            </Button>
          </div>
        </div>
        <div className="searchResults_container" style={{border: '2px solid black', borderRadius: '15px'}}>
          {this.state.returnedUsers.length === 0 ? (
            <h1 style={{ fontSize: "18px" }}>
              Nothing here yet - Also remember that you're searching for users
              based on their activity preferences!
            </h1>
          ) : (
            this.state.returnedUsers.map(person => {
              return (
                <div key={person.id}>
                  {person.full_name} - {person.display_name}
                  <Popup
                    trigger={
                      <Button size="small" color="default">
                        Add As Friend
                      </Button>
                    }
                    position="right center"
                  >
                    {close => (
                      <div>
                        Are you sure you want to?
                        <Button
                          size="small"
                          color="default"
                          onClick={() =>
                            this.addFriend(
                              person.id,
                              person.email,
                              person.display_name,
                              close
                            )
                          }
                        >
                          Yes
                        </Button>
                        <Button size="small" color="default" onClick={close}>
                          No
                        </Button>
                      </div>
                    )}
                  </Popup>
                  <Popup
                    trigger={
                      <Button size="small" color="default">
                        Message
                      </Button>
                    }
                    position="right center"
                    modal
                  >
                    {close => (
                      <div className="messageContainer">
                        <h1
                          style={{
                            fontSize: "25px",
                            textDecorationLine: "underline"
                          }}
                        >
                          Send them a Message - Tell them how you FEEL!
                        </h1>
                        <h2 style={{ color: "grey" }}>Subject</h2>
                        <textarea
                          className="messageSubject"
                          name="text"
                          wrap="soft"
                          required
                          value={this.state.messageSubject}
                          onChange={event => {
                            this.setState({
                              messageSubject: event.target.value
                            });
                          }}
                        >
                          {" "}
                        </textarea>
                        <h2 style={{ color: "grey" }}>Message Body</h2>{" "}
                        <textarea
                          className="message"
                          name="text"
                          wrap="soft"
                          required
                          value={this.state.userMessage}
                          onChange={event => {
                            this.setState({ userMessage: event.target.value });
                          }}
                        >
                          {" "}
                        </textarea>
                        <div className="messageButtons">
                          <Button
                            size="small"
                            color="default"
                            onClick={() => this.sendMessage(person.id, close)}
                          >
                            Send Message
                          </Button>
                          <Button
                            size="small"
                            color="default"
                            onClick={this.clearMessage}
                          >
                            Clear Message
                          </Button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
export default SearchAdd;
