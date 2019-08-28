import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Popup from "reactjs-popup";
import "../../App.css";
import moment from "../../../node_modules/moment";
import logo from "../../video_and_sound_files/Croozer logo.svg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() { 
    setAnchorEl(null);
  }

  const logout = async () => {
    try {
      await axios.post("/logout");
      alert(`You've successfully been logged out!`);
      props.history.push("/");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const whoWon = event => {
    if (event.challenger_win === false) {
      return event.accepter_full_name;
    } else {
      return event.challenger_full_name;
    }
  };

  const renderRedirect = () => {
    props.history.push("/changeAccount");
  };

  return (
    <div className="header_container">
      <AppBar style={{ backgroundColor: '#717275', height: '70px' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Popup
              trigger={
                <MenuItem onClick={handleClose}>Event Breakdown</MenuItem>
              }
              position="right center"
              modal
            >
              {close => (
                <div className="eventModalContainer">
                  <h1
                    style={{
                      fontSize: "25px",
                      textDecorationLine: "underline"
                    }}
                  >
                    {" "}
                    Event Breakdown!
                  </h1>
                  {props.events.map(event => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "10px"
                        }}
                      >
                        <div className="eventModal_innerContainer">
                          <div className="individual_event_container">
                            <h1>Challenger:</h1>
                            {event.challenger_full_name}
                          </div>
                          <div className="individual_event_container">
                            <h1>Accepter:</h1>
                            {event.accepter_full_name}
                          </div>
                          <div className="individual_event_container">
                            <h1>Event Description:</h1>
                            {event.event_activity}
                          </div>
                          <div className="individual_event_container">
                            <h1>Time of Event:</h1>
                            {moment(event.day_of_event).format("MMMM Do YYYY")}
                          </div>
                          <div className="individual_event_container">
                            <h1>Who Won?</h1>
                            {whoWon(event)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    size="small"
                    color="default"
                    style={{backgroundColor: '#C7152E', color: 'white', width: '20%'}}
                    onClick={() => {
                      close();
                    }}
                  >
                    Go Back
                  </Button>
                </div>
              )}
            </Popup>

            <MenuItem onClick={renderRedirect}>
              Change Account Settings
            </MenuItem>
          </Menu>
          <img src={logo} width='300px' height='70px'></img>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ display: "flex", margin: '30px' }}
          >
            Current Record: {props.wins} Wins // {props.losses} Losses
          </Typography>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
