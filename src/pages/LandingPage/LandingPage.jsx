import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card, Header, Container, Image } from "semantic-ui-react";
import burger from "../../assets/burger.png";

import "./LandingPage.css";

const LandingPage = (props) => {
  const homeScreen = () => {
    if (props.yelpGrabs.length) return;
    return (
      <Container text textAlign="center" className="homeScreen">
        <Header
          as="h1"
          content="Find yourself..."
          inverted
          style={{
            fontWeight: "normal",
            marginBottom: 0,
            fontSize: 40,
          }}
        />
        <Header
          as="h2"
          content="inside the dankest"
          inverted
          style={{
            fontWeight: "normal",
            fontSize: 25,
          }}
        />
        <Header
          as="h2"
          content="hidden gems in your area!"
          inverted
          style={{
            fontWeight: "normal",
            fontSize: 25,
          }}
        />
        <Image src={burger} size="large" className="homeScreenImage" />
      </Container>
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
        clearYelpGrabs={props.clearYelpGrabs}
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
