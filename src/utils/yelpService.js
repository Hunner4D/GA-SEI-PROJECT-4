// url to api = "https://api.yelp.com/v3";
const BASE_URL = "/api/users/";

export function routeToYelp() {
  console.log("hitting routeToYelp");
  return fetch(BASE_URL + "yelp", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(),
  }).then((res) => {
    console.log("this is res: ", res);
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error("Invalid request to yelp!");
  });
}

/////////////////////////////////////////////////////////////

// export function routeToYelp() {
//   const endpoint = `https://api.yelp.com/v3/businesses/search`;
//   return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
// }

///////////////////////////SUPPLEMENTARY CODE//////////////////////////////////

// apiGrab = async () => {
//   const response = await yelpfusion.get("/businesses/search", {
//     params: {
//       term: "food",
//       latitude: this.state.coords.lat,
//       longitude: this.state.coords.long,
//       key: yelpfusionkey,
//     },
//   });
//   console.log(response);

/////////////////////////////////////////////////////////////

// const yelp = require("yelp-fusion");
// // Place holder for Yelp Fusion's API Key. Grab them
// // from https://www.yelp.com/developers/v3/manage_app
// const apiKey = yelpfusionkey;

// const searchRequest = {
//   term: "Four Barrel Coffee",
//   location: "san francisco, ca",
// };

// const client = yelp.client(apiKey);

// client
//   .search(searchRequest)
//   .then((response) => {
//     const firstResult = response.jsonBody.businesses[0];
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// };
