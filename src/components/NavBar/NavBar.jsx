import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import FGlogo from "../../../public/FGlogo";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="LinkBody">
      <span>Welcome, {props.user.name}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link to="" className="NavBar-link" onClick={props.handleLogout}>
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

  return (
    <div>
      <div className="NavBar ui segment">
        {/* <img src={FGlogo} /> */}
        <h1 className="Title">
          <span className="bigletter">F</span>ood&nbsp;&nbsp;&nbsp;
          <span className="bigletter">G</span>uru
        </h1>
        {nav}
      </div>

      {/* SUB NAV BAR HERE */}
      <div className="ui attached stackable menu">
        <div className="ui container">
          <a className="item">
            <i className="home icon"></i> Home
          </a>
          <a className="item">
            <i className="grid layout icon"></i> Browse
          </a>
          <a className="item">
            <i className="mail icon"></i> Messages
          </a>
          <div className="ui simple dropdown item">
            More
            <i className="dropdown icon"></i>
            <div className="menu">
              <a className="item">
                <i className="edit icon"></i> Edit Profile
              </a>
              <a className="item">
                <i className="globe icon"></i> Choose Language
              </a>
              <a className="item">
                <i className="settings icon"></i> Account Settings
              </a>
            </div>
          </div>
          <div className="right item">
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
