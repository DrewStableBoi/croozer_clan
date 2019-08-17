import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

class EventSchedule extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      userEvents: []
    };
  }

  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }

  componentDidMount() {
    const id = this.props.user.id;
    axios.get("/getEvents", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userMessages: response.data
      });
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

  render() {
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
                    <Button size="small" color="default">
                      Send Message
                    </Button>
                    <Button size="small" color="default">
                      Clear Message
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
                        Sent at:
                      </h1>
                      <h2>{index.time_of_message}</h2>
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
                              onClick={() => this.sendMessage(index.sender_id)}
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

export default EventSchedule;
