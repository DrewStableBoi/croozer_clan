import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Header from "./functional/home_header";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        user: props.user
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
      <div className="whole_app" id="home_container">
        <Header user={this.state.user}/>
      </div>
    );
  }
}

export default Home;
