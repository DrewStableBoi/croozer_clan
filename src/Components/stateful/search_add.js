import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SearchAdd extends Component {
  constructor() {
    super();

    this.state = {
      type: "",
      name: "",
      returnedUsers: [],
      categoryChecked: false,
      arenaChecked: false,
      activityChecked: false,
      searched: false,
      categoryDisabled: false,
      arenaDisabled: false,
      activityDisabled: false
    };
  }

  resetState = () => {
    this.setState({
      type: "",
      name: "",
      returnedUsers: [],
      categoryChecked: false,
      arenaChecked: false,
      activityChecked: false,
      searched: false,
      categoryDisabled: false,
      arenaDisabled: false,
      activityDisabled: false
    });
  };

  searchUsers = () => {
    const type = this.state.type;
    const name = this.state.name;
    if (!type) {
      return alert("Please enter the search parameters and try again!");
    } else {
      axios
        .get("/search", { params: { type, name } })
        .then(users => {
          this.setState({ returnedUsers: users.data, searched: true });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  addFriend = () => {};

  deleteFriend = () => {};

  render() {
    console.log(this.state);
    return (
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <div className="search_container">
          <h1 style={{ fontSize: "35px", textDecorationLine: "underline" }}>
            Search Users for a Challenge!
          </h1>
          <div className="searchBar_container">
            <TextField
              className="login_text"
              variant="standard"
              margin="dense"
              required
              fullWidth
              label="Search Here"
              value={this.state.name}
              autoFocus
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
            />
          </div>
          <div className="checkbox_container">
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.categoryChecked}
                  disabled={this.state.categoryDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_first",
                      categoryChecked: !this.state.categoryChecked,
                      arenaDisabled: true,
                      activityDisabled: true
                    });
                  }}
                />
              }
              label="by Category"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.arenaChecked}
                  disabled={this.state.arenaDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_second",
                      arenaChecked: !this.state.arenaChecked,
                      categoryDisabled: true,
                      activityDisabled: true
                    });
                  }}
                />
              }
              label="by Arena"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="default"
                  checked={this.state.activityChecked}
                  disabled={this.state.activityDisabled}
                  onChange={() => {
                    this.setState({
                      type: "activities_third",
                      activityChecked: !this.state.activityChecked,
                      categoryDisabled: true,
                      arenaDisabled: true
                    });
                  }}
                />
              }
              label="by Activity"
            />
          </div>
          <div className="searchButton_container">
            <Button color="default" onClick={this.searchUsers}>
              Search
            </Button>
            <Button color="default" onClick={this.resetState}>
              Clear Search
            </Button>
          </div>
        </div>
        <div className="searchResults_container">
          {this.state.returnedUsers.length === 0 ? (
            <h1 style={{ fontSize: "18px" }}>
              Nothing here yet - Remember that the search parameters are
              case-sensitive!
            </h1>
          ) : (
            this.state.returnedUsers.map(person => {
              return (
                <div>
                  {person.full_name} - {person.display_name}
                  <Button size="small" color="default">Add as Friend</Button>
                  <Button size="small" color="default">Message</Button>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
export default SearchAdd;
