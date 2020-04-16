import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card, Header, Container } from "semantic-ui-react";
import ListSavedLocations from "../../components/listSavedLocations/listSavedLocations";

import "./LocationsPage.css";

class LocationsPage extends React.Component {
  displayPageHeader = () => {
    let pageheader = "";
    if (this.props.user) {
      pageheader = "your saved locations:";
    } else {
      pageheader = "login to save locations:";
    }
    return pageheader;
  };

  render() {
    return (
      <div className="LocationsPage">
        <NavBar
          user={this.props.user}
          handleSignupOrLogin={this.props.handleSignupOrLogin}
          handleLogout={this.props.handleLogout}
          apiGrab={this.props.apiGrab}
          clearYelpGrabs={this.props.clearYelpGrabs}
        />

        <div className="ui container LPbody">
          <Container text textAlign="center" className="homeScreen">
            <Header
              as="h5"
              content={this.displayPageHeader()}
              inverted
              style={{
                fontWeight: "normal",
                marginTop: 80,
                marginBottom: 70,
                fontSize: 30,
              }}
            />
          </Container>
          <Card.Group>
            <ListSavedLocations
              savedLocationsObjs={this.props.savedLocationsObjs}
              user={this.props.user}
            />
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default LocationsPage;
