const YELPSECRET = process.env.YELP_SECRET;
const yelp = require("yelp-fusion");
const User = require("../models/user");

module.exports = {
  getYelp,
  getYelpSpecific,
  addLocation,
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
  const searchRequest = {
    locale: req.body.localeId,
  };
  const client = yelp.client(apiKey);
  client
    .business(searchRequest)
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

async function addLocation(req, res) {
  console.log("req body for addLocation", req.body);
  let user = await User.findOne({ email: req.body.user.email })
    .then((u) => {
      // u.savedLocations = [];
      console.log("this is u:", u);
      u.savedLocations.push(req.body.locId);
      console.log("this is u after:", u);
      u.save();
      return u.savedLocations;
    })
    .then((r) => {
      console.log("result: ", r);
      res.status(201).json(r);
    });

  // console.log("this is user", user);
  // user.savedLocations.push(req.body.location);
  // console.log("this is saved location", user.savedLocations);
  // await user.save();
  // res.status(201).json(req.body.location);
}
