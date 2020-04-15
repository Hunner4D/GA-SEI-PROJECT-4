const YELPSECRET = process.env.YELP_SECRET;
const yelp = require("yelp-fusion");
const User = require("../models/user");

module.exports = {
  getYelp,
  getYelpSpecific,
  addLocation,
  getLocations,
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

async function getYelpSpecific(req, res) {
  console.log("hitting controller. term: ", req.body);
  // Place holder for Yelp Fusion's API Key. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const apiKey = YELPSECRET;
  const client = yelp.client(apiKey);
  client
    .business(req.body.query)
    .then((response) => {
      // console.log(response);
      if (response.statusCode === 200) {
        console.log(response.jsonBody);
        return res.json(response.jsonBody);
      }
      return res.send({ code: 500, message: "Something went wrong..." });
    })
    .catch((e) => {
      console.log("error dude: ", e);
    });
}

async function addLocation(req, res) {
  // console.log("req body for addLocation", req.body);
  await User.findOne({ email: req.body.user.email }).exec((err, user) => {
    const previouslySaved = user.savedLocations;
    user.savedLocations = [...previouslySaved, req.body.locAlias];
    // user.markModified("savedLocations"); - would use this if nested schema was still a thing
    user.save((err) => {
      if (err) {
        console.log("***");
        console.error(err);
        console.log("***");
        return res.status(500);
      }
      res.status(201).json(user);
    });
  });
}

async function getLocations(req, res) {
  console.log("Coming from getLocations, req.body -> ", req.body);
  await User.findOne({ email: req.body.email }).exec((err, user) => {
    const allLocations = user.savedLocations;
    if (err) {
      console.log("Error from getLocations", err);
      return res.status(500);
    }
    res.status(201).json(allLocations);
  });
}
