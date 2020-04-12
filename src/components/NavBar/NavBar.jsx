import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import FGlogo from "../../../public/FGlogo";
import { Button, Form } from "semantic-ui-react";

class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }

  handleSearchChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleSearchSubmit = () => {
    this.props.apiGrab(this.state.query);
  };

  responsiveNav = () => {
    let nav = this.props.user ? (
      <div className="LinkBody">
        <span>Welcome, {this.props.user.name}</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <Link to="" className="NavBar-link" onClick={this.props.handleLogout}>
          LOG OUT
        </Link>
      </div>
    ) : (
      <div className="LinkBody">
        <Link to="/login" className="NavBar-link">
          LOG IN
        </Link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to="/signup" className="NavBar-link">
          SIGN UP
        </Link>
      </div>
    );
    return nav;
  };

  render() {
    return (
      <div>
        <div className="NavBar ui segment">
          <img src={"../../../build/static/media/logo.png"} />
          <h1 className="Title">
            <span className="bigletter">F</span>ood&nbsp;&nbsp;&nbsp;
            <span className="bigletter">G</span>uru
          </h1>
          {this.responsiveNav()}
        </div>

        {/* SUB NAV BAR HERE */}
        <div className="ui attached stackable menu">
          <div className="ui container subNav">
            <Link to="/" className="item">
              <i className="home icon"></i> Home
            </Link>
            <Link to="/" className="item">
              <i className="grid layout icon"></i> Browse
            </Link>
            <Link to="/" className="item">
              <i className="mail icon"></i> Messages
            </Link>
            <div className="ui simple dropdown item">
              More
              <i className="dropdown icon"></i>
              <div className="menu">
                <Link to="/" className="item">
                  <i className="edit icon"></i> Edit Profile
                </Link>
                <Link to="/" className="item">
                  <i className="globe icon"></i> Choose Language
                </Link>
                <Link to="/" className="item">
                  <i className="settings icon"></i> Account Settings
                </Link>
              </div>
            </div>
            <div className="right item">
              <div className="ui input">
                <Form onSubmit={this.handleSearchSubmit}>
                  <Form.Input
                    className="navInput"
                    name="query"
                    type="text"
                    placeholder="Search For Food..."
                    value={this.state.query}
                    onChange={this.handleSearchChange}
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
