import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card } from "semantic-ui-react";

import "./LandingPage.css";

const LandingPage = (props) => {
  const homeScreen = () => {
    if (props.yelpGrabs.length) return;
    return (
      <div>
        <h1>Welcome!</h1>
      </div>

      //uhhh
    );
  };

  const listYelpGrabs = props.yelpGrabs.map((item) => {
    let categories = [];
    item.categories.forEach((e) => categories.push(e.title));

    return (
      <Card
        fluid
        color="yellow"
        header={item.name}
        meta={`Rating: ${item.rating}, Price: ${item.price}`}
        description={categories.join(", ")}
        key={item.id}
        href={`http://www.google.com/search?q=${item.alias.replace(/-/g, " ")}`}
        target="_blank"
      />
    );
  });

  return (
    <div className="LandingPage">
      <NavBar
        user={props.user}
        handleSignupOrLogin={props.handleSignupOrLogin}
        handleLogout={props.handleLogout}
        apiGrab={props.apiGrab}
      />

      <div className="ui container LPbody">
        <div className="flexButtons">
          <button
            className="ui segment syncButton"
            onClick={props.syncLocation}
          >
            Sync Location
          </button>
          <button className="ui segment syncButton">
            Connect with a Guru!
          </button>
        </div>
        {homeScreen()}
        <Card.Group>{listYelpGrabs}</Card.Group>
        <br />
      </div>
    </div>
  );
};

export default LandingPage;
