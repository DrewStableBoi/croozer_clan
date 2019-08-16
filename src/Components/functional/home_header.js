import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  logOut = async () => {
    console.log(this.props)
    try {
      await axios.post("/logout");
      alert(`You've successfully been logged out!`); 
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="header_container">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          style={{
            fontFamily: "Alegreya Sans, sans-serif",
            fontSize: "20px",
            color: "white"
          }}
        >
          Croozer Home
        </Button>
        <Menu id="simple-menu" keepMounted>
          <MenuItem>Friend List</MenuItem>
          <MenuItem>Friend Requests</MenuItem>
          <MenuItem>Send Messages</MenuItem>
        </Menu>
        <Button style={{ color: "white" }} onClick={this.logOut}>
          LOGOUT
        </Button>
      </div>
    );
  }
}
export default Header;
