import React from "react";
import { Card } from "semantic-ui-react";
import "./listSavedLocations.css";

// import "./LandingPage.css";

const ListSavedLocations = (props) => {
  const allLocations = props.savedLocationsObjs.map((item) => {
    let addCardContent = <span className="addCardContent">X</span>;
    let categories = [];
    item.categories.forEach((e) => categories.push(e.title));
    return (
      <div
        className="cardContainer"
        key={`${item.location.address1}${item.id}`}
      >
        <Card
          fluid
          color="yellow"
          header={item.name}
          meta={`Rating: ${item.rating}, Price: ${item.price}`}
          description={categories.join(", ")}
          key={item.id}
          href={`http://www.google.com/search?q=${item.alias.replace(
            /-/g,
            " "
          )}`}
          target="_blank"
          extra={`${item.location.address1}, ${item.location.city}, ${
            item.location.zip_code
          } ${"                                                     "}`}
          className="yelpCard"
        />
        <Card
          fluid
          className="addCard"
          header={addCardContent}
          href={`#`}
          key={item.alias}
          onClick={() => props.deleteFromLocations(item)}
        />
      </div>
    );
  });

  return <div className="cardContainer">{allLocations}</div>;
};

export default ListSavedLocations;
