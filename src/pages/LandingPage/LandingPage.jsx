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
      />
    </div>
  );
};

export default LandingPage;
