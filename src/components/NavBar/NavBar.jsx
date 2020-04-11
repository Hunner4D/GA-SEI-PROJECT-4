import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div className="LinkBody">
      <Link to="" className="NavBar-link" onClick={props.handleLogout}>
        LOG OUT
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <span>WELCOME, {props.user.name}</span>
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
    <div className="NavBar ui segment">
      <h1 className="Title">
        <span className="bigletter">F</span>ood&nbsp;&nbsp;&nbsp;
        <span className="bigletter">G</span>uru
      </h1>
      {nav}
    </div>
  );
};

export default NavBar;
