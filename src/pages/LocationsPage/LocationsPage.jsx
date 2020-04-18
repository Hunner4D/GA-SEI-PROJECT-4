import React from "react";
import { Link } from "react-router-dom";
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
          searchRequest={this.props.searchRequest}
          clearYelpGrabs={this.props.clearYelpGrabs}
          history={this.props.history}
          lat={this.props.lat}
        />

        <div className="ui container LPbody">
          <div className="flexButtons">
            <button
              className="ui segment syncButton"
              onClick={this.props.syncLocation}
            >
              Sync Location
            </button>
            <Link to="/messages" className="darkText">
              <button className="ui segment syncButton">
                Connect with a Guru!
              </button>
            </Link>
          </div>
          <Container text textAlign="center" className="homeScreen">
            <Header
              as="h5"
              content={this.displayPageHeader()}
              inverted
              style={{
                fontWeight: "normal",
                marginBottom: 70,
                fontSize: 30,
              }}
            />
          </Container>
          <Card.Group>
            <ListSavedLocations
              savedLocationsObjs={this.props.savedLocationsObjs}
              user={this.props.user}
              deleteFromLocations={this.props.deleteFromLocations}
            />
          </Card.Group>
        </div>
      </div>
    );
  }
}

export default LocationsPage;
