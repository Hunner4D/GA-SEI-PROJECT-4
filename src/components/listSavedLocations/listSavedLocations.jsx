import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Card, Header, Container, Image } from "semantic-ui-react";
import burger from "../../assets/burger.png";

// import "./LandingPage.css";

const ListSavedLocations = (props) => {
  const allLocations = props.savedLocationsObjs.map((location) => {
    console.log("this is location: ", location);
    // let categories = [];
    // e.categories.forEach((e) => categories.push(e.title));
    // console.log("this is e: ", e);
    return (
      <div
        className="cardContainer"
        key={`${location.location.address1}${location.id}`}
      >
        <Card fluid color="yellow" header={location.name} />
        <Card
          fluid
          // className="addCard"
          //   header={addCardContent}
          href={`#`}
          key={location.alias}
          // onClick={() => props.addToLocations(e)}
        />
      </div>
    );
  });

  return <div>{allLocations}</div>;
};

export default ListSavedLocations;
