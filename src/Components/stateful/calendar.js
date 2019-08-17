import React from "react";
import "../../App.css";
import Calendar from "react-calendar";

class AppCalendar extends React.Component {
  state = {
    date: new Date()
  };

  onChange = date => this.setState({ date });

  Friday = ({ date }) => {
    console.log(date);
  };

  render() {
    return (
      <Calendar
        className="calendar"
        onChange={this.onChange}
        value={this.state.date}
        tileClassName={this.Friday}
      />
    );
  }
}

export default AppCalendar;
