const YELPSECRET = process.env.YELP_SECRET;
const yelp = require("yelp-fusion");

module.exports = {
  getYelp,
};

async function getYelp(req, res) {
  console.log("hitting controller. term: ", req.body);
  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = YELPSECRET;
  const searchRequest = {
    term: req.body.term,
    // location: "san francisco, ca",
    latitude: req.body.lat,
    longitude: req.body.long,
  };
  const client = yelp.client(apiKey);
  client
    .search(searchRequest)
    .then((response) => {
      const Result = response.jsonBody.businesses;
      //   const Result = response.jsonBody;
      const prettyJson = JSON.stringify(Result, null, 4);
      const prettyObj = JSON.parse(prettyJson);
      res.json(prettyObj);
    })
    .catch((e) => {
      console.log("error dude: ", e);
    });
}
