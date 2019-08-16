import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popup from "reactjs-popup";

class MessageCentral extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      userMessages: [],
      responseSubject: "",
      responseMessage: ""
    };
  }

  componentDidMount() {
    const id = this.props.user.id;
    axios.get("/getMessages", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userMessages: response.data
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: '#76828c' }}>
        <h1
          style={{
            display: 'flex',
            padding: '10px',
            fontSize: "35px",
            textDecorationLine: "underline",
            color: "white"
          }}
        >
          Message Central!
        </h1>
        {this.state.userMessages.map(index => {
          return (
            <div>
              <div className="messageCentral_container">
                <div className="messageCentral_subject">
                  {index.message_subject}
                </div>
                <div className="messageCentral_body">{index.message_body}</div>
                <h1
                  style={{ fontSize: "18px", display: "flex", color: "white" }}
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
                    trigger={
                      <button>Respond</button>
                    }
                    position="right center"
                  >
                    <div>
                      Are you sure you want to?
                      <button>Yes</button>
                      <button>No</button>
                    </div>
                  </Popup>
                  <Popup
                    trigger={
                      <button>Delete</button>
                    }
                    position="right center"
                  >
                    <div>
                      Are you sure you want to?
                      <button>Yes</button>
                      <button>No</button>
                    </div>
                  </Popup>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default MessageCentral;
