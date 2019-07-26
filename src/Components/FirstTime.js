import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

class FirstTime extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      birthday: "",
      clanTag: "",
      league: "",
      state: "",
      activities: [],
      preferredTimes: [],
      created: false
    };
  }

  render() {
    return (
      <div className="whole_app">
          In progress!
      </div>
    );
  }
}

export default FirstTime;
