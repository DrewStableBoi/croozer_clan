import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import Header from "../functional/home_header";
import HomeDisplay from "./home_content";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  logOut = async () => {
    try {
      await axios.get("/logout");
      alert(`You've successfully been logged out!`);
      this.props.history.push("/");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className="whole_app" id="home_container">
        <Header user={this.props.user} logout={this.logOut} />
        <HomeDisplay user={this.props.user} />
      </div>
    );
  }
}

export default Home;
