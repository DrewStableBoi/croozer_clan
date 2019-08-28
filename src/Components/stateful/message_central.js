import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";
import moment from "../../../node_modules/moment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";


class MessageCentral extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      userMessages: [],
      responseSubject: "",
      responseMessage: "",
      newSubject: "",
      newMessage: "",
      userList: [],
      userFriends: [],
      selectedFriendId: ""
    };
  }

  startUp = () => {
    const id = this.props.user.id;
    axios.get("/getMessages", { params: { id } }).then(response => {
      this.setState({
        userMessages: response.data
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
  };

  componentDidMount() {
    this.startUp();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.user !== this.props.user) {
      this.startUp();
    }
  };

  refreshMessages = () => {
    const id = this.props.user.id;
    axios.get("/getMessages", { params: { id } }).then(response => {
      this.setState({
        userMessages: response.data
      });
    });
  };

  sendMessage = async (id, close) => {
    const messageObject = {
      messageSubject: this.state.responseSubject,
      userMessage: this.state.responseMessage,
      recipientId: id,
      senderId: this.props.user.id
    };
    try {
      await axios.post("/sendMessage", messageObject);
      alert(
        `Thanks, ${this.props.user.display_name}! You've just sent your message. They'll get back to you, soon!`
      );
      close();
      this.props.history.push("/home");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  sendMessageTwo = async (close) => {
    const messageObject = {
      messageSubject: this.state.responseSubject,
      userMessage: this.state.responseMessage,
      recipientId: this.state.selectedFriendId,
      senderId: this.props.user.id
    };
    try {
      await axios.post("/sendMessage", messageObject);
      alert(
        `Thanks, ${this.props.user.display_name}! You've just sent your message. They'll get back to you, soon!`
      );
      close();
      this.props.history.push("/home");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  clearMessage = () => {
    this.setState({
      responseMessage: "",
      responseSubject: ""
    });
  };

  deleteMessage = async (id, close) => {
    try {
      await axios.delete(`/message/${id}`);
      this.refreshMessages();
      alert("Message Deleted!");
      this.props.history.push("/home");
      close();
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#717275"
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
            Message Central!
          </h1>
          <div
            className="searchButton_container"
            style={{
              display: "flex",
              padding: "10px"
            }}
          >
            <Button onClick={this.refreshMessages} style={{color: 'white'}}>
              Refresh Messages
            </Button>

            <Popup
              trigger={<Button style={{color: 'white'}}>Send A Message</Button>}
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
                    Find a Friend, Send them a Message!
                  </h1>
                  <FormControl style={{ width: "30%", textAlign: "left" }}>
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
                          <MenuItem value={friend.requester_id}>
                            {friend.requester_display}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <h2 style={{ color: "grey" }}>Subject</h2>
                  <textarea
                    className="messageSubject"
                    name="text"
                    wrap="soft"
                    required
                    value={this.state.responseSubject}
                    onChange={event => {
                      this.setState({
                        responseSubject: event.target.value
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
                    value={this.state.responseMessage}
                    onChange={event => {
                      this.setState({
                        responseMessage: event.target.value
                      });
                    }}
                  >
                    {" "}
                  </textarea>
                  <div className="messageButtons">
                    <Button
                      size="small"
                      onClick={() => this.sendMessageTwo(close)}
                      style={{backgroundColor: '#C7152E', color: 'white'}}
                    >
                      Send Message
                    </Button>
                    <Button
                      size="small"
                      color="default"
                      onClick={() => this.clearMessage}
                    >
                      Clear Message
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
        {this.state.userMessages.length === 0 ? (
          <h1 style={{ fontSize: "18px" }}>
            Nothing here in your messages yet. You can try refreshing if you'd
            like!
          </h1>
        ) : (
          this.state.userMessages.map(index => {
            return (
              <div>
                <div className="messageCentral_container">
                  <div className="messageCentral_subject">
                    {index.message_subject}
                  </div>
                  <div className="messageCentral_body">
                    {index.message_body}
                  </div>
                  <h1
                    style={{
                      fontSize: "18px",
                      display: "flex",
                      color: "white"
                    }}
                  >
                    From:
                  </h1>
                  <div className="messageCentral_from">
                    <div className="messageCentral_fromNames">
                      <h2 style={{ display: "flex", paddingRight: "5px" }}>
                        {index.sender_name}
                      </h2>
                      <h3 style={{ color: "white", display: "flex" }}>
                        ( {index.sender_full_name} )
                      </h3>
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
                        Sent:
                      </h1>
                      <h2>
                        {moment(index.time_of_message).format(
                          "dddd, MMMM Do YYYY, h:mm:ss a"
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="messageCentral_buttons">
                    <Popup
                      trigger={<button>Respond</button>}
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
                            Send them a Reply!
                          </h1>
                          <h2 style={{ color: "grey" }}>Subject</h2>
                          <textarea
                            className="messageSubject"
                            name="text"
                            wrap="soft"
                            required
                            value={this.state.responseSubject}
                            onChange={event => {
                              this.setState({
                                responseSubject: event.target.value
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
                            value={this.state.responseMessage}
                            onChange={event => {
                              this.setState({
                                responseMessage: event.target.value
                              });
                            }}
                          >
                            {" "}
                          </textarea>
                          <div className="messageButtons">
                            <Button
                              size="small"
                              color="default"
                              onClick={() =>
                                this.sendMessage(index.sender_id, close)
                              }
                            >
                              Send Message
                            </Button>
                            <Button
                              size="small"
                              color="default"
                              onClick={() => this.clearMessage()}
                            >
                              Clear Message
                            </Button>
                          </div>
                        </div>
                      )}
                    </Popup>
                    <Popup
                      trigger={<button>Delete</button>}
                      position="right center"
                    >
                      {close => (
                        <div>
                          Are you sure you want to?
                          <button
                            onClick={() =>
                              this.deleteMessage(index.message_id, close)
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
export default MessageCentral;
