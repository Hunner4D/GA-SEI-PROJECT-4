import React from "react";
import NavBar from "../../components/NavBar/NavBar";

import "./LandingPage.css";

const LandingPage = (props) => {
  return (
    <div className="LandingPage">
      <NavBar
        user={props.user}
        handleSignupOrLogin={props.handleSignupOrLogin}
        handleLogout={props.handleLogout}
        apiGrab={props.apiGrab}
      />

      <div className="ui container LPbody">
        <button className="ui segment syncButton" onClick={props.syncLocation}>
          Sync Location
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
