import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import moment from "moment";

class FriendRequests extends React.Component {
  state = {
    friendRequests: [],
    mainUser: {}
  };

  componentDidMount() {
    const id = this.props.user.id;
    axios.get("/getFriendRequests", { params: { id } }).then(response => {
      this.setState({
        friendRequests: response.data
      });
    });
    this.setState({
      mainUser: this.props.user
    });
  }
  
  refreshRequests = () => {
    const id = this.props.user.id;
    axios.get("/getFriendRequests", { params: { id } }).then(response => {
      this.setState({
        friendRequests: response.data
      });
    });
  }

  approve = async (id) => {
    try {
      await axios.post(`/approve/${id}`);
      this.refreshRequests();
      alert("Friend Request Approved!");
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  deny = async (id) => {
    try {
      await axios.post(`/deny/${id}`);
      this.refreshRequests();
      alert("Friend Request Denied!");
    } catch (err) {
      console.log(err);
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
                <div className="messageCentral_container" style={{justifyContent: 'space-around'}}>
                  <div className="messageCentral_subject">
                    {index.user_display} ({index.requester_full_name})
                  </div>
                  <div className="messageCentral_body">
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
