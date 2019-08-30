import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

class SearchAdd extends Component {
  constructor() {
    super();

    this.state = {
      mainUser: {},
      type: "",
      name: "",
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
  }

  searchUsers = () => {
    const type = this.state.type;
    const name = this.state.name;
    const userId = this.state.mainUser.id;
    if (!type) {
      return alert("Please enter the search parameters and try again!");
    } else if (!name) {
      return alert("Please enter the search parameters and try again!");
    } else {
      axios
        .get("/search", { params: { type, name, userId } })
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
        `Thanks, ${
          this.props.user.display_name
        }! You've just sent your message. They'll get back to you, soon!`
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
    return (
      <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: 'center' }}>
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
          <div className="searchBar_container">
            <TextField
              className="login_text"
              variant="standard"
              margin="dense"
              required
              fullWidth
              label="Search Here"
              value={this.state.name}
              autoFocus
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </div>
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
                      categoryDisabled: true,
                      arenaDisabled: true
                    });
                  }}
                />
              }
              label="by Activity"
            />
          </div>
          <div className="searchButton_container">
            <Button color="default" onClick={this.searchUsers} style={{color: 'white'}}>
              Search
            </Button>
            <Button color="default" onClick={this.resetState} style={{color: 'white'}}>
              Clear Search
            </Button>
          </div>
        </div>
        <div className="searchResults_container">
          {this.state.returnedUsers.length === 0 ? (
            <h1 style={{ fontSize: "18px" }}>
              Nothing here yet - Remember that the search parameters are
              case-sensitive! Also remember that you're searching for users based on their activity preferences!
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
