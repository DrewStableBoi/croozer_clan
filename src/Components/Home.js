import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();

    this.state = {
        loggedIn: true
    };
  }
 
  logOut = async () => {
    try {
      await axios.get("/logout");
      this.setState({ loggedIn: false });
      alert(`You've successfully been logged out!`);
      this.props.history.push("/");
    } catch (error) {
      alert(
        "Something went wrong!"
      );
    }
  };

  render() {
    return (
      <div className="whole_app">
        WHAT'S UP, BITCHES?!
        <button className="login_button" onClick={this.logOut}>Click here to log out!</button>
      </div>
    );
  }
}

export default Home;
