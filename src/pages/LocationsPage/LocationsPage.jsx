import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card, Header, Container } from "semantic-ui-react";

import "./LocationsPage.css";

class LocationsPage extends React.Component {
  state = {
    userLocations: [],
  };

  async componentDidMount() {
    let locations = await this.props.showAllLocations();
    // console.log(locations);
    this.setState({
      userLocations: locations,
    });
  }

  listUserLocations = () => {
    let userLocations = this.state.userLocations;
    console.log("this is userLocations: ", userLocations);
    let addCardContent = <span className="addCardContent">+</span>;
    userLocations.map((e) => {
      console.log("this is e: ", e);
      let categories = [];
      e.categories.forEach((e) => categories.push(e.title));
      return (
        <div className="cardContainer" key={`${e.location.address1}${e.id}`}>
          <Card
            fluid
            color="yellow"
            header={e.name}
            meta={`Rating: ${e.rating}, Price: ${e.price}`}
            description={categories.join(", ")}
            key={e.id}
            href={`http://www.google.com/search?q=${e.alias.replace(
              /-/g,
              " "
            )}`}
            target="_blank"
            extra={`${e.location.address1}, ${e.location.city}, ${
              e.location.zip_code
            } ${"                                                     "}`}
            // className="yelpCard"
          />
          <Card
            fluid
            // className="addCard"
            header={addCardContent}
            href={`#`}
            key={e.alias}
            // onClick={() => props.addToLocations(e)}
          />
        </div>
      );
    });
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
          <Card.Group>{this.listUserLocations()}</Card.Group>
        </div>
      </div>
    );
  }
}

export default LocationsPage;
