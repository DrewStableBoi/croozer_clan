import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import moment from "moment";

class FriendRequests extends Component {
  state = {
    friendRequests: [],
    mainUser: {}
  };

  startUp = () => {
    const id = this.props.user.id;
    axios.get("/getFriendRequests", { params: { id } }).then(response => {
      this.setState({
        friendRequests: response.data
      });
    });
    this.setState({
      mainUser: this.props.user
    });
  };

  componentDidMount() {
    if (this.props.user.id) {
      this.startUp();
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.user !== this.props.user) {
      this.startUp();
    }
  };

  refreshRequests = () => {
    const id = this.props.user.id;
    axios.get("/getFriendRequests", { params: { id } }).then(response => {
      this.setState({
        friendRequests: response.data
      });
    });
  };

  approve = async id => {
    try {
      await axios.post(`/approve/${id}`);
      this.refreshRequests();
      alert("Friend Request Approved!");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  deny = async id => {
    try {
      await axios.post(`/deny/${id}`);
      this.refreshRequests();
      alert("Friend Request Denied!");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  delete = async id => {
    try {
      await axios.delete(`/request/${id}`);
      this.refreshRequests();
      alert("Duplicate Request Deleted!");
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
            Friend Requests!
          </h1>
        </div>
        {this.state.friendRequests.length === 0 ? (
          <h1 style={{ fontSize: "18px" }}>
            No Friend Requests yet! Search users to add friends!
          </h1>
        ) : (
          this.state.friendRequests.map(index => {
            return (
              <div>
                <div
                  className="messageCentral_container"
                  style={{ justifyContent: "space-around" }}
                >
                  <div className="messageCentral_subject">
                    {index.requester_display} ({index.requester_full_name})
                  </div>
                  <div className="messageCentral_body" style={{display: 'flex'}}>
                    Wants to be your friend!
                  </div>
                  <div className="messageCentral_from">
                    <div className="messageCentral_from_time">
                      <h1
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          color: "white",
                          paddingRight: "5px"
                        }}
                      >
                        Request Time:
                      </h1>
                      <h2>
                        {moment(index.time_of_addition).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="messageCentral_buttons">
                    <button
                      onClick={() => {
                        this.approve(index.request_id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        this.deny(index.request_id);
                      }}
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => {
                        this.delete(index.request_id);
                      }}
                    >
                      Delete Duplicate Request
                    </button>
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

export default FriendRequests;
