import React from "react";
import "../../App.css";
import SearchAdd from "./search_add";
import MessageCentral from "./message_central";
import AppCalendar from "./calendar";
import EventScheduler from "./event_scheduler";

class HomeContent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.render();
    }
  }

  render() {
    return (
      <div className="home_info_container">
        <div>
          {this.props.user.display_name ? (
            <div className="home_info_left_container">
              {" "}
              <h1 style={{ fontSize: "40px" }} className="home_info_left_item">
                Welcome Back,{" "}
                <p style={{ fontSize: "40px", color: "white" }}>
                  {this.props.user.display_name}!{" "}
                </p>
              </h1>
              <h2 className="home_info_left_item">
                <h3 className="home_info_left_itemHeader" id="headerFont">
                  Clan Tag:
                </h3>
                {this.props.user.clan_tag}
              </h2>
              <h2 className="home_info_left_item">
                <h3 className="home_info_left_itemHeader" id="headerFont">
                  Competitive Categories:
                </h3>
                {this.props.user.activities_first.map(item => {
                  return <p>{item}</p>;
                })}
              </h2>
              <h2 className="home_info_left_item">
                <h3 className="home_info_left_itemHeader" id="headerFont">
                  Arenas:
                </h3>
                {this.props.user.activities_second.map(item => {
                  return <p>{item}</p>;
                })}
              </h2>
              <h2 className="home_info_left_item">
                <h3 className="home_info_left_itemHeader" id="headerFont">
                  Specific Activities:
                </h3>
                {this.props.user.activities_third.map(item => {
                  return <p>{item}</p>;
                })}
              </h2>
              <h2 className="home_info_left_item">
                <h3 className="home_info_left_itemHeader" id="headerFont">
                  Active Times:
                </h3>
                {this.props.user.times_active.map(item => {
                  return <p>{item}</p>;
                })}
              </h2>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="home_info_right_containerMain">
          <div className="home_info_right_containerLeft">
            <div className="home_info_right_containerLeft_sub1">
              <SearchAdd {...this.props} user={this.props.user} />
            </div>
            <div className="home_info_right_containerLeft_API_content">
              <MessageCentral {...this.props} user={this.props.user} />
            </div>
          </div>
          <div className="home_info_right_containerRight">
            <div
              style={{
                boxShadow: "10px 15px 5px rgb(0, 0, 0)",
                border: "4px solid grey",
                borderRadius: "15px"
              }}
            >
              <AppCalendar {...this.props} user={this.props.user} />{" "}
            </div>
            <div className="home_info_right_containerRight_events">
              <EventScheduler {...this.props} user={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContent;
