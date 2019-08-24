import React, { Component } from "react";
import "../../App.css";
import Header from "../functional/home_header";
import HomeContent from "./home_content";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userWins: 0,
      userLosses: 0,
      userEvents: []
    };
  }

  componentDidMount() {
    this.getRecord();
    this.getFinishedEvents();
  }

  getRecord = () => {
    const id = this.props.user.id;
    axios.get("/getRecord", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userWins: response.data.total_wins,
        userLosses: response.data.total_losses
      });
    });
  };

  getFinishedEvents = () => {
    const id = this.props.user.id;
    axios.get("/getFinishedEvents", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        userEvents: response.data
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="whole_app" id="home_container">
        <Header
          {...this.props}
          user={this.props.user}
          wins={this.state.userWins}
          losses={this.state.userLosses}
          events={this.state.userEvents}
        />
        <HomeContent {...this.props} user={this.props.user} />
      </div>
    );
  }
}

export default Home;
