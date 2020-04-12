const YELPSECRET = process.env.YELP_SECRET;
const yelp = require("yelp-fusion");

module.exports = {
  getYelp,
};

async function getYelp(req, res) {
  console.log("hitting controller");
  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = YELPSECRET;
  const searchRequest = {
    term: "Four Barrel Coffee",
    location: "san francisco, ca",
  };
  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      const prettyObj = JSON.parse(prettyJson);
      res.json(prettyObj);
    })
    .catch((e) => {
      console.log("error dude: ", e);
    });
}
