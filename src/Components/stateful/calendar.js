import React from "react";
import "../../App.css";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios"

class AppCalendar extends React.Component {
  state = {
    date: new Date(),
    scheduledDates: [],
    userEvents: [],
    mainUser: {}
  };

  componentDidMount() {
    const id = this.props.user.id;
    axios.get("/getEventDays", { params: { id } }).then(response => {
      console.log(response);
      this.setState({
        scheduledDates: response.data.map(e => e.day_of_event)
      });
    });
    axios.get("/getEvents", { params: { id } }).then(response => {
      this.setState({
        userEvents: response.data
      });
    });
    this.setState({
      mainUser: this.props.user
    });
  }

  onChange = date => this.setState({ date });

  scheduledDays = ({ date }) => {
    const calendarDate = moment(date).format("L");
    const foundDate = this.state.scheduledDates.find(event => {
      const eventDate = moment(event).format("L");
      return eventDate === calendarDate;
    });
    if (foundDate) return "calendarPop";
  };


  render() {
    console.log(this.state.scheduledDates)
    if (this.state.scheduledDates.length === 0) return <div>Loading...</div>
    return (
      <Calendar
        className="calendar"
        onChange={this.onChange}
        value={this.state.date}
        tileClassName={this.scheduledDays}
      />
    );
  }
}

export default AppCalendar;
