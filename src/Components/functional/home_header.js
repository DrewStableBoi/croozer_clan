import React from "react";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="header_container">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          fontFamily: "Alegreya Sans, sans-serif",
          fontSize: "20px",
          color: "white"
        }}
      >
        Croozer Home
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Friend List</MenuItem>
        <MenuItem onClick={handleClose}>Friend Requests</MenuItem>
        <MenuItem onClick={handleClose}>Send Messages</MenuItem>
      </Menu>
      <Button style={{color: 'white'}}>LOGOUT</Button>
    </div>
  );
}
export default Header;
