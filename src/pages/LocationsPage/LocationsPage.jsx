import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card, Header, Container } from "semantic-ui-react";

import "./LocationsPage.css";

class LocationsPage extends React.Component {
  async componentDidMount() {
    let locations = await this.props.showAllLocations();
    console.log(locations);
  }

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
              content="your saved locations:"
              inverted
              style={{
                fontWeight: "normal",
                marginTop: 80,
                marginBottom: 40,
                fontSize: 30,
              }}
            />
          </Container>
          <Card.Group>{}</Card.Group>
        </div>
      </div>
    );
  }
}

export default LocationsPage;
