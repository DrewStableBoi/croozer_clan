import React, { Component } from "react";
import "../../App.css";
import Header from "../functional/home_header";
import HomeContent from "./home_content";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.render();
    }
  }
zx

  render() {
    console.log(this.props);
    return (
      <div className="whole_app" id="home_container">
        <Header {...this.props} user={this.props.user} />
        <HomeContent {...this.props} user={this.props.user} />
      </div>
    );
  }
}

export default Home;
 