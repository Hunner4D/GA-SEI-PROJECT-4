import React from "react";
import NavBar from "../../components/NavBar/NavBar";
// import { Card, Header, Container, Image } from "semantic-ui-react";

import "./MessagesPage.css";

const MessagesPage = (props) => {
  return (
    <div className="MessagesPage">
      <NavBar
        user={props.user}
        handleSignupOrLogin={props.handleSignupOrLogin}
        handleLogout={props.handleLogout}
        apiGrab={props.apiGrab}
        clearYelpGrabs={props.clearYelpGrabs}
      />

      <div className="ui container LPbody"></div>
    </div>
  );
};

export default MessagesPage;
